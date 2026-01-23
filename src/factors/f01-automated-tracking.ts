import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';
import fs from 'node:fs/promises';
import path from 'node:path';

export class AutomatedTrackingFactor extends BaseFactor {
    factorId = Factor.AutomatedTracking;

    async check(analysis: AnalysisResult, rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        // Check for git
        try {
            await fs.access(path.join(rootPath, '.git'));
            score += 50;
            findings.push('Git repository detected');
        } catch {
            suggestions.push('Initialize a git repository');
        }

        // Check for structured commits (simple check for convention)
        // In a real scenario, we'd check git log, but for now we look for contributing guidelines or commitlint
        if (analysis.patterns.some(p => p.files.some(f => f.includes('CONTRIBUTING') || f.includes('commitlint')))) {
            score += 25;
            findings.push('Commit conventions likely enforced (CONTRIBUTING/commitlint found)');
        } else {
            suggestions.push('Add CONTRIBUTING.md or commitlint to enforce structured commits');
        }

        // Check for CI for operations tracking
        const hasCI = analysis.patterns.some(p => p.name === 'CI/CD Workflows');
        if (hasCI) {
            score += 25;
            findings.push('CI/CD workflows detected (automated operations tracking)');
        } else {
            suggestions.push('Setup CI/CD pipelines to track operations automatically');
        }

        return this.createScore(score, findings, suggestions);
    }
}
