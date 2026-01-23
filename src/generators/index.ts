import { AnalysisResult, ScaffoldFile } from '../types';
import { ScaffoldOptions } from '../core/scaffolder';
import { ClaudeMdGenerator } from './claude-md-generator';
import { ConfigGenerator } from './config-generator';
import { AgentGenerator } from './agent-generator';
import { StructureGenerator } from './structure-generator';

export function generateAll(analysis: AnalysisResult, options: ScaffoldOptions): ScaffoldFile[] {
    const generators = [
        new ClaudeMdGenerator(options),
        new ConfigGenerator(options),
        new AgentGenerator(options),
        new StructureGenerator(options),
    ];

    return generators.flatMap(g => g.generate(analysis));
}
