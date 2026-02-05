import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';

export class ContextLoadingFactor extends BaseFactor {
    factorId = Factor.ContextLoading;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        // Check for context management configs usually in .agentops or similar
        const hasContextConfig = analysis.configs.some(c => c.content.includes('context') || c.content.includes('token_limit'));

        if (hasContextConfig) {
            score += 80;
            findings.push('Context management configuration detected');
        } else {
            suggestions.push('Define explicit context limits and chunking strategies in configuration');
        }

        // Check for chunking logic in code
        // This is hard to detect statically with high confidence without deeper analysis, 
        // but we can look for "chunk" or "split" keywords in potential agent files
        const hasChunkingLogic = false;

        if (hasChunkingLogic) {
            score += 20;
        }

        // Default low score if nothing found
        if (score === 0) {
            score = 20; // Give some leniency
            findings.push('No explicit context management detected');
        }

        return this.createScore(score, findings, suggestions);
    }
}
