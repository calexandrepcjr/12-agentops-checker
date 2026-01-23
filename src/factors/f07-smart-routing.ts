import { BaseFactor } from '../base-factor.js';
import { AnalysisResult, Factor, FactorScore } from '../../types.js';

export class SmartRoutingFactor extends BaseFactor {
    factorId = Factor.SmartRouting;

    async check(analysis: AnalysisResult, _rootPath: string): Promise<FactorScore> {
        const findings: string[] = [];
        const suggestions: string[] = [];
        let score = 0;

        const routerAgent = analysis.agents.find(a => a.name.includes('router') || a.name.includes('dispatch') || a.name.includes('orchestrator'));

        if (routerAgent) {
            score += 90;
            findings.push(`Router agent detected: ${routerAgent.name}`);
        } else if (analysis.agents.length > 2) {
            suggestions.push('With > 2 agents, consider adding a Router/Orchestrator agent');
        } else {
            score = 50; // Not strictly needed for small systems
            findings.push('Small system, router may not be needed yet');
        }

        return this.createScore(score, findings, suggestions);
    }
}
