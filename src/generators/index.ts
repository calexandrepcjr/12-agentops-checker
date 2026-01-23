import { AnalysisResult, ScaffoldFile, ScaffoldOptions } from '../types.js';
import { ClaudeMdGenerator } from './claude-md-generator.js';
import { ConfigGenerator } from './config-generator.js';
import { AgentGenerator } from './agent-generator.js';
import { StructureGenerator } from './structure-generator.js';

export function generateAll(analysis: AnalysisResult, options: ScaffoldOptions): ScaffoldFile[] {
    const generators = [
        new ClaudeMdGenerator(options),
        new ConfigGenerator(options),
        new AgentGenerator(options),
        new StructureGenerator(options),
    ];

    return generators.flatMap(g => g.generate(analysis));
}
