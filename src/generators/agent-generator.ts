import { BaseGenerator } from './base-generator';
import { AnalysisResult, ScaffoldFile } from '../types';

export class AgentGenerator extends BaseGenerator {
    generate(analysis: AnalysisResult): ScaffoldFile[] {
        // Only generate example if no agents exist
        if (analysis.agents.length > 0) {
            return [];
        }

        if (analysis.language === 'python') {
            return this.generatePythonAgent();
        }

        // Default to TS
        return this.generateTSAgent();
    }

    private generateTSAgent(): ScaffoldFile[] {
        const content = `import { Agent } from './base-agent';

export class ExampleAgent {
    async run(input: string): Promise<string> {
        console.log('Processing:', input);
        return 'Done';
    }
}
`;
        return [{
            path: 'src/agents/example-agent.ts',
            content,
            overwrite: false,
        }];
    }

    private generatePythonAgent(): ScaffoldFile[] {
        const content = `class ExampleAgent:
    def run(self, input_str: str) -> str:
        print(f"Processing: {input_str}")
        return "Done"
`;
        return [{
            path: 'src/agents/example_agent.py',
            content,
            overwrite: false,
        }];
    }
}
