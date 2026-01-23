import { LanguageDetector } from './language-detector';
import { AgentDetector } from './agent-detector';
import { ConfigDetector } from './config-detector';
import { PatternDetector } from './pattern-detector';
import { AnalysisResult } from '../types';

export async function runAllDetectors(rootPath: string): Promise<AnalysisResult> {
    const langDetector = new LanguageDetector();
    const agentDetector = new AgentDetector();
    const configDetector = new ConfigDetector();
    const patternDetector = new PatternDetector();

    const [language, agents, configs, patterns] = await Promise.all([
        langDetector.detect(rootPath),
        agentDetector.detect(rootPath),
        configDetector.detect(rootPath),
        patternDetector.detect(rootPath),
    ]);

    // Determine project type based on findings
    let projectType = 'unknown';
    if (agents.length > 0) projectType = 'agentic-system';
    else if (language !== 'unknown') projectType = `standard-${language}`;

    return {
        language,
        agents,
        configs,
        patterns,
        projectType,
    };
}

export { BaseDetector } from './base-detector';
export { LanguageDetector } from './language-detector';
export { AgentDetector } from './agent-detector';
export { ConfigDetector } from './config-detector';
export { PatternDetector } from './pattern-detector';
