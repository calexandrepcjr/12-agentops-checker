import { AutomatedTrackingFactor } from './f01-automated-tracking';
import { ContextLoadingFactor } from './f02-context-loading';
import { FocusedAgentsFactor } from './f03-focused-agents';
import { ContinuousValidationFactor } from './f04-continuous-validation';
import { MeasureEverythingFactor } from './f05-measure-everything';
import { ResumeWorkFactor } from './f06-resume-work';
import { SmartRoutingFactor } from './f07-smart-routing';
import { HumanValidationFactor } from './f08-human-validation';
import { MinePatternsFactor } from './f09-mine-patterns';
import { SmallIterationsFactor } from './f10-small-iterations';
import { FailSafeChecksFactor } from './f11-fail-safe-checks';
import { PackagePatternsFactor } from './f12-package-patterns';
import { AnalysisResult, FactorScore } from '../types';

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

export * from './base-factor';
