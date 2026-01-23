import { Analyzer } from './analyzer';
import { assessAllFactors } from '../factors/index';
import { AssessmentResult } from '../types';
import { SCORE_THRESHOLDS } from '../constants';

export class Assessor {
    private analyzer: Analyzer;

    constructor() {
        this.analyzer = new Analyzer();
    }

    async assess(rootPath: string): Promise<AssessmentResult> {
        // 1. Run Analysis
        const analysis = await this.analyzer.analyze(rootPath);

        // 2. Run All Factor Checkers
        const scores = await assessAllFactors(analysis, rootPath);

        // 3. Calculate Overall Score
        const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
        const overallScore = Math.round(totalScore / scores.length);

        // 4. Determine Grade
        let grade: AssessmentResult['grade'] = 'F';
        if (overallScore >= SCORE_THRESHOLDS.A) grade = 'A';
        else if (overallScore >= SCORE_THRESHOLDS.B) grade = 'B';
        else if (overallScore >= SCORE_THRESHOLDS.C) grade = 'C';
        else if (overallScore >= SCORE_THRESHOLDS.D) grade = 'D';

        return {
            scores,
            overallScore,
            grade
        };
    }
}
