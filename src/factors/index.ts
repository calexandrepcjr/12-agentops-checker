import { AutomatedTrackingFactor } from './f01-automated-tracking.js';
import { ContextLoadingFactor } from './f02-context-loading.js';
import { FocusedAgentsFactor } from './f03-focused-agents.js';
import { ContinuousValidationFactor } from './f04-continuous-validation.js';
import { MeasureEverythingFactor } from './f05-measure-everything.js';
import { ResumeWorkFactor } from './f06-resume-work.js';
import { SmartRoutingFactor } from './f07-smart-routing.js';
import { HumanValidationFactor } from './f08-human-validation.js';
import { MinePatternsFactor } from './f09-mine-patterns.js';
import { SmallIterationsFactor } from './f10-small-iterations.js';
import { FailSafeChecksFactor } from './f11-fail-safe-checks.js';
import { PackagePatternsFactor } from './f12-package-patterns.js';
import { AnalysisResult, FactorScore } from '../types.js';

export async function assessAllFactors(analysis: AnalysisResult, rootPath: string): Promise<FactorScore[]> {
    const checkers = [
        new AutomatedTrackingFactor(),
        new ContextLoadingFactor(),
        new FocusedAgentsFactor(),
        new ContinuousValidationFactor(),
        new MeasureEverythingFactor(),
        new ResumeWorkFactor(),
        new SmartRoutingFactor(),
        new HumanValidationFactor(),
        new MinePatternsFactor(),
        new SmallIterationsFactor(),
        new FailSafeChecksFactor(),
        new PackagePatternsFactor(),
    ];

    return Promise.all(checkers.map(checker => checker.check(analysis, rootPath)));
}

export * from './base-factor.js';
