import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';

export class ResumeWorkFactor extends BaseFactor {
    factorId = Factor.ResumeWork;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        // Check for DB or Redis or filesystem persistence
        const hasPersistence = analysis.configs.some(c => c.content.includes('redis') || c.content.includes('database') || c.content.includes('sqlite'));

        if (hasPersistence) {
            score += 60;
            findings.push('Persistence configuration detected');
        } else {
            suggestions.push('Implement state persistence (Redis/DB) to allow resuming work');
        }

        return this.createScore(score, findings, suggestions);
    }
}
