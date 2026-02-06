import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';

export class ContinuousValidationFactor extends BaseFactor {
    factorId = Factor.ContinuousValidation;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasTests = this.checkForTests(analysis);
        if (hasTests) {
            score += 40;
            findings.push('Automated tests detected (continuous validation loop)');
        } else {
            suggestions.push('Add automated tests and run them after code changes');
        }

        const hasCI = analysis.patterns.some(p => p.name === 'CI/CD Workflows');
        if (hasCI) {
            score += 30;
            findings.push('CI/CD pipelines detected (automated gates)');
        } else {
            suggestions.push('Setup CI/CD validation gates for agent changes');
        }

        const hasSelfVerification = analysis.configs.some(c =>
            c.content.includes('selfVerification') ||
            c.content.includes('runUnitTestsAfterCodeChanges') ||
            c.content.includes('requireGreenChecksBeforeCompletion')
        );

        if (hasSelfVerification) {
            score += 30;
            findings.push('Self-verification harness settings detected');
        } else {
            suggestions.push('Add self-verification hooks (test execution + critique/revise loop)');
        }

        return this.createScore(score, findings, suggestions);
    }

    private checkForTests(analysis: AnalysisResult): boolean {
        const hasTestPattern = analysis.patterns.some(p => p.name === 'Automated Tests');
        if (hasTestPattern) {
            return true;
        }

        return analysis.configs.some(c => c.content.includes('"test"') || c.content.includes('pytest'));
    }
}
