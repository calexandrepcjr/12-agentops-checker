import { BaseGenerator } from './base-generator.js';
import { AnalysisResult, ScaffoldFile } from '../types.js';

export class StructureGenerator extends BaseGenerator {
    generate(_analysis: AnalysisResult): ScaffoldFile[] {
        // We create files to ensure directories exist (git doesn't track empty dirs)
        return [
            {
                path: '.agentops/.keep',
                content: '',
                overwrite: false
            },
            {
                path: 'src/agents/.keep',
                content: '',
                overwrite: false
            },
            {
                path: 'src/factors/.keep',
                content: '',
                overwrite: false
            }
        ];
    }
}
