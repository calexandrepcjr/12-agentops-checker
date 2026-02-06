import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';

export class FailSafeChecksFactor extends BaseFactor {
    factorId = Factor.FailSafeChecks;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasCircuitBreaker = analysis.configs.some(c =>
            c.content.includes('circuit_breaker') ||
            c.content.includes('rate_limit') ||
            c.content.includes('validation') ||
            c.content.includes('humanApproval')
        );

        if (hasCircuitBreaker) {
            score += 80;
            findings.push('Circuit breaker / Rate limiting detected');
        } else {
            suggestions.push('Implement circuit breakers for external LLM calls');
            suggestions.push('Add approval gates for high-impact actions and autonomous tool calls');
        }

        return this.createScore(score, findings, suggestions);
    }
}
