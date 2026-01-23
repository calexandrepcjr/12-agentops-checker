import { AnalysisResult, ScaffoldFile } from '../types';
import { ScaffoldOptions } from '../core/scaffolder';

export abstract class BaseGenerator {
    protected options: ScaffoldOptions;

    constructor(options: ScaffoldOptions) {
        this.options = options;
    }

    abstract generate(analysis: AnalysisResult): ScaffoldFile[];
}
