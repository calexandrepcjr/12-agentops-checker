import { BaseDetector } from './base-detector';
import { DetectedConfig } from '../types';
import { DETECTION_PATTERNS as PATTERNS } from '../constants';

export class ConfigDetector extends BaseDetector<DetectedConfig[]> {
    async detect(rootPath: string): Promise<DetectedConfig[]> {
        const configs: DetectedConfig[] = [];

        // Loop through config patterns
        for (const pattern of PATTERNS.config) {
            const found = await this.globFiles(pattern, rootPath);
            for (const file of found) {
                const content = await this.readFile(this.joinPath(rootPath, file));
                if (content) {
                    configs.push({
                        path: file,
                        type: 'agentops-config',
                        content: content
                    });
                }
            }
        }

        return configs;
    }
}
