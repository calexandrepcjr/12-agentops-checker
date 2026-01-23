import { BaseDetector } from './base-detector.js';
import { DetectedPattern } from '../types.js';

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

        return patterns;
    }
}
