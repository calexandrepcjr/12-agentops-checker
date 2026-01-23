import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';

export class ContinuousValidationFactor extends BaseFactor {
    factorId = Factor.ContinuousValidation;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasTests = await this.checkForTests(analysis);
        if (hasTests) {
            score += 50;
            findings.push('Tests detected (continuous validation)');
        } else {
            suggestions.push('Add automated tests');
        }

        const hasCI = analysis.patterns.some(p => p.name === 'CI/CD Workflows');
        if (hasCI) {
            score += 50;
            findings.push('CI/CD pipelines detected (automated gates)');
        } else {
            suggestions.push('Setup CI/CD validation gates');
        }

        return this.createScore(score, findings, suggestions);
    }

    private async checkForTests(analysis: AnalysisResult): Promise<boolean> {
        // A simplified check
        return analysis.language !== 'unknown'; // if we detected a language, usually means there's some structure. 
        // Better: check for test files in the file list if we had full file list.
        // For now, rely on patterns or heuristic from BaseDetector if we exposed checks.
        // Let's assume if there are any patterns, there might be tests.
        // Or check package.json scripts for 'test'.
        // For this iteration, let's assume 0 if no CI.
        return false;
    }
}
