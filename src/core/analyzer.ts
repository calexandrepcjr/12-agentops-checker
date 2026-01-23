import { AnalysisResult } from '../types';
import { runAllDetectors } from '../detectors/index';

export class Analyzer {
    async analyze(rootPath: string): Promise<AnalysisResult> {
        return runAllDetectors(rootPath);
    }
}
