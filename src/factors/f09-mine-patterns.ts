import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';

export class MinePatternsFactor extends BaseFactor {
    factorId = Factor.MinePatterns;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasPatterns = analysis.patterns.length > 0;

        if (hasPatterns) {
            score += 80;
            findings.push(`Found ${analysis.patterns.length} pattern sources`);
        } else {
            suggestions.push('Extract successful workflows into reusable patterns/templates');
        }

        return this.createScore(score, findings, suggestions);
    }
}
