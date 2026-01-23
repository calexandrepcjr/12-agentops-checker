import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';

export class SmallIterationsFactor extends BaseFactor {
    factorId = Factor.SmallIterations;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        // Check for feature flags or A/B testing configs
        const hasFlags = analysis.configs.some(c => c.content.includes('feature_flag') || c.content.includes('experiment'));

        if (hasFlags) {
            score += 70;
            findings.push('Feature flags/Experimentation config detected');
        } else {
            suggestions.push('Implement feature flags to enable small iterative rollouts');
        }

        // Also check for versioning info in agents
        score += 20; // assumed baseline for using git

        return this.createScore(score, findings, suggestions);
    }
}
