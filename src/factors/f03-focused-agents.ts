import { BaseFactor } from './base-factor';
import { AnalysisResult, Factor, FactorScore } from '../types';

export class FocusedAgentsFactor extends BaseFactor {
    factorId = Factor.FocusedAgents;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const agentCount = analysis.agents.length;

        if (agentCount === 0) {
            findings.push('No agents detected');
            suggestions.push('Define agents in /agents directory');
            return this.createScore(0, findings, suggestions);
        }

        findings.push(`Detected ${agentCount} agents: ${analysis.agents.map(a => a.name).join(', ')}`);

        if (agentCount > 1) {
            score += 50;
            findings.push('Multiple agents found (good for separation of concerns)');
        } else {
            suggestions.push('Consider splitting monolithic agent into specialized agents');
        }

        // Check if agents have focused names (heuristic)
        const focusedNames = analysis.agents.filter(a => !a.name.toLowerCase().includes('general') && !a.name.toLowerCase().includes('main'));
        if (focusedNames.length > 0) {
            score += 50;
            findings.push('Agents seem to have specialized names');
        }

        return this.createScore(score, findings, suggestions);
    }
}
