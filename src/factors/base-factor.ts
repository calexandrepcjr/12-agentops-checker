import { AnalysisResult, Factor, FactorScore } from '../types';

export abstract class BaseFactor {
    abstract factorId: Factor;

    abstract check(analysis: AnalysisResult, rootPath: string): Promise<FactorScore>;

    protected createScore(score: number, findings: string[], suggestions: string[]): FactorScore {
        return {
            factor: this.factorId,
            score: Math.min(100, Math.max(0, score)),
            findings,
            suggestions,
        };
    }
}
