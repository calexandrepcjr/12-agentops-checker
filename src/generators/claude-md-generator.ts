import { BaseGenerator } from './base-generator.js';
import { AnalysisResult, ScaffoldFile } from '../types.js';

export class ClaudeMdGenerator extends BaseGenerator {
    generate(analysis: AnalysisResult): ScaffoldFile[] {
        const content = `# CLAUDE.md

## Project Overview
This project is a ${analysis.language} application (${analysis.projectType}).

## Build Commands
- Build: \`npm run build\` (adjust as needed)
- Test: \`npm test\`
- Lint: \`npm run lint\`

## Code Styles
- Language: ${analysis.language}
- Formatting: Follow .eslintrc.js and prettier
- Types: Strict mode enabled

## AgentOps Conventions
- Agents: Located in /agents/
- Config: .agentops/ directory
- Patterns: Reusable workflows in methods
`;

        return [{
            path: 'CLAUDE.md',
            content,
            overwrite: false
        }];
    }
}
