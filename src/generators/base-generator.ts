import { AnalysisResult, ScaffoldFile, ScaffoldOptions } from '../types.js';

export abstract class BaseGenerator {
    protected options: ScaffoldOptions;

    constructor(options: ScaffoldOptions) {
        this.options = options;
    }

    abstract generate(analysis: AnalysisResult): ScaffoldFile[];
}
