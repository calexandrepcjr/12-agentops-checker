import { BaseGenerator } from './base-generator.js';
import { AnalysisResult, ScaffoldFile } from '../types.js';

export class ConfigGenerator extends BaseGenerator {
    generate(_analysis: AnalysisResult): ScaffoldFile[] {
        const config = {
            $schema: "./.agentops/schema.json",
            context: {
                maxTokens: 40000,
                strategy: "truncate"
            },
            validation: {
                strict: true,
                humanApproval: ["deploy", "delete"]
            },
            telemetry: {
                enabled: true,
                provider: "console"
            }
        };

        return [{
            path: '.agentops.config.json',
            content: JSON.stringify(config, null, 2),
            overwrite: false
        }];
    }
}
