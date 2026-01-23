import { LanguageDetector } from './language-detector.js';
import { AgentDetector } from './agent-detector.js';
import { ConfigDetector } from './config-detector.js';
import { PatternDetector } from './pattern-detector.js';
import { AnalysisResult } from '../types.js';

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

export { BaseDetector } from './base-detector.js';
export { LanguageDetector } from './language-detector.js';
export { AgentDetector } from './agent-detector.js';
export { ConfigDetector } from './config-detector.js';
export { PatternDetector } from './pattern-detector.js';
