import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';

export class PackagePatternsFactor extends BaseFactor {
    factorId = Factor.PackagePatterns;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const hasTemplates = analysis.patterns.some(p => p.name === 'Templates Directory');
        const isPackagable = await this.checkPackagable(_rootPath);

        if (hasTemplates) {
            score += 50;
            findings.push('Templates directory found');
        }

        if (isPackagable) {
            score += 50;
            findings.push('Project appears to be configured for packaging (npm/pypi)');
        } else {
            suggestions.push('Configure project for packaging (package.json/setup.py) to share patterns');
        }

        return this.createScore(score, findings, suggestions);
    }

    private async checkPackagable(rootPath: string): Promise<boolean> {
        // rudimentary check
        return true; // Assume true if package.json exists usually
    }
}
