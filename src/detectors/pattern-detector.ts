import { BaseDetector } from './base-detector';
import { DetectedPattern } from '../types';

export class PatternDetector extends BaseDetector<DetectedPattern[]> {
    async detect(rootPath: string): Promise<DetectedPattern[]> {
        const patterns: DetectedPattern[] = [];

        // Check for templates directory
        if (await this.fileExists(this.joinPath(rootPath, 'templates'))) {
            patterns.push({
                name: 'Templates Directory',
                description: 'Found /templates directory indicating reusable patterns',
                files: await this.globFiles('templates/**/*', rootPath)
            });
        }

        // Check for workflows
        if (await this.fileExists(this.joinPath(rootPath, '.github/workflows'))) {
            patterns.push({
                name: 'CI/CD Workflows',
                description: 'Found GitHub Actions workflows',
                files: await this.globFiles('.github/workflows/*.yml', rootPath)
            });
        }

        // Check for automated tests
        const testFiles = await this.globFiles('**/*.{test,spec}.{ts,tsx,js,jsx,py}', rootPath);
        if (testFiles.length > 0) {
            patterns.push({
                name: 'Automated Tests',
                description: 'Found unit/integration test files',
                files: testFiles
            });
        }

        // Check for agentic harness/tooling hints
        const harnessFiles = await this.globFiles('**/*{mcp,tool,harness,router,workflow}*.{ts,js,py,json,yml,yaml}', rootPath);
        if (harnessFiles.length > 0) {
            patterns.push({
                name: 'Agentic Harness Tooling',
                description: 'Found files suggesting tool-augmented agent workflows',
                files: harnessFiles
            });
        }

        return patterns;
    }
}
