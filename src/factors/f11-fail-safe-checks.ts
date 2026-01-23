import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';

export class FailSafeChecksFactor extends BaseFactor {
    factorId = Factor.FailSafeChecks;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasCircuitBreaker = analysis.configs.some(c => c.content.includes('circuit_breaker') || c.content.includes('rate_limit'));

        if (hasCircuitBreaker) {
            score += 80;
            findings.push('Circuit breaker / Rate limiting detected');
        } else {
            suggestions.push('Implement circuit breakers for external LLM calls');
        }

        return this.createScore(score, findings, suggestions);
    }
}
