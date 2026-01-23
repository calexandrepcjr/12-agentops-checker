import { AnalysisResult } from '../types.js';
import { runAllDetectors } from '../detectors/index.js';

export class Analyzer {
    async analyze(rootPath: string): Promise<AnalysisResult> {
        return runAllDetectors(rootPath);
    }
}
