import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';
import fs from 'node:fs/promises';
import path from 'node:path';

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
        const packageIndicators = [
            'package.json',
            'pyproject.toml',
            'setup.py',
            'setup.cfg',
            'Cargo.toml',
        ];

        for (const file of packageIndicators) {
            try {
                await fs.access(path.join(rootPath, file));
                return true;
            } catch {
                // continue checking other indicators
            }
        }

        return false;
    }
}
