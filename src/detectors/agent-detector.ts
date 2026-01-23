import { BaseDetector } from './base-detector.js';
import { DetectedAgent, DETECTION_PATTERNS } from '../types.js'; // Correction: DETECTION_PATTERNS is in constants
import { DETECTION_PATTERNS as PATTERNS } from '../constants.js';

export class AgentDetector extends BaseDetector<DetectedAgent[]> {
    async detect(rootPath: string): Promise<DetectedAgent[]> {
        const agents: DetectedAgent[] = [];

        // Look for agents/skills directories
        const agentFiles = await this.globFiles(PATTERNS.agent[0], rootPath); // '**/agents/**/*.ts'
        const pythonAgentFiles = await this.globFiles(PATTERNS.agent[1], rootPath); // '**/agents/**/*.py'

        // Naive implementation: each file in agents/ is an agent
        for (const file of [...agentFiles, ...pythonAgentFiles]) {
            // Exclude test files
            if (file.includes('.test.') || file.includes('.spec.') || file.includes('__tests__')) continue;

            agents.push({
                name: file.split('/').pop()?.replace(/\.(ts|py|js)$/, '') || 'unknown',
                path: file,
                type: 'agent',
                responsibilities: [], // To be populated by analysing content
            });
        }

        // Look for MCP servers (basic check for now)
        const packageJson = await this.readFile(this.joinPath(rootPath, 'package.json'));
        if (packageJson && packageJson.includes('"@modelcontextprotocol/sdk"')) {
            agents.push({
                name: 'mcp-server',
                path: 'package.json',
                type: 'server',
                responsibilities: ['MCP Server'],
            });
        }

        return agents;
    }
}
