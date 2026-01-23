import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
    AGENTOPS_ANALYZE_TOOL,
    AGENTOPS_ASSESS_TOOL,
    AGENTOPS_LINT_TOOL,
    AGENTOPS_SCAFFOLD_TOOL,
} from './tools.js';
import { Analyzer } from '../core/analyzer.js';
import { Assessor } from '../core/assessor.js';
import { Scaffolder } from '../core/scaffolder.js';
import { Reporter } from '../core/reporter.js';
import { ReportFormat } from '../types.js';

export class AgentOpsServer {
    private server: Server;

    constructor() {
        this.server = new Server(
            {
                name: 'agentops-checker',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.setupHandlers();
    }

    private setupHandlers(): void {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                AGENTOPS_ANALYZE_TOOL,
                AGENTOPS_ASSESS_TOOL,
                AGENTOPS_SCAFFOLD_TOOL,
                AGENTOPS_LINT_TOOL,
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            switch (request.params.name) {
                case 'agentops_analyze': {
                    const path = String(request.params.arguments?.path);
                    const analyzer = new Analyzer();
                    const result = await analyzer.analyze(path);
                    return {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    };
                }

                case 'agentops_assess': {
                    const path = String(request.params.arguments?.path);
                    const assessor = new Assessor();
                    const result = await assessor.assess(path);
                    // Default to markdown report for MCP as it reads better in Claude
                    const reporter = new Reporter();
                    return {
                        content: [{ type: 'text', text: reporter.format(result, ReportFormat.Markdown) }],
                    };
                }

                case 'agentops_scaffold': {
                    const path = String(request.params.arguments?.path);
                    const apply = Boolean(request.params.arguments?.apply);
                    const scaffolder = new Scaffolder();
                    const result = await scaffolder.scaffold(path, { apply });
                    return {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    };
                }

                case 'agentops_lint': {
                    const path = String(request.params.arguments?.path);
                    const assessor = new Assessor();
                    const result = await assessor.assess(path);
                    const failures = result.scores.filter(s => s.score < 50);

                    if (failures.length > 0) {
                        const text = `Lint Failed:\n${failures.map(f => `- [${f.factor}] ${f.findings[0] || 'Low score'}`).join('\n')}`;
                        return {
                            content: [{ type: 'text', text }],
                            isError: true, // This allows MCP to signal error state
                        };
                    }
                    return {
                        content: [{ type: 'text', text: 'Lint Passed' }],
                    };
                }

                default:
                    throw new Error('Unknown tool');
            }
        });
    }

    async run(): Promise<void> {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
    }
}
