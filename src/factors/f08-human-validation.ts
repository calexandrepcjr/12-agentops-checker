import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';

export class HumanValidationFactor extends BaseFactor {
    factorId = Factor.HumanValidation;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasHumanLoop = analysis.configs.some(c => c.content.includes('human') || c.content.includes('approval'));

        if (hasHumanLoop) {
            score += 80;
            findings.push('Human-in-the-loop configuration detected');
        } else {
            suggestions.push('Configure human approval steps for critical actions');
        }

        return this.createScore(score, findings, suggestions);
    }
}
