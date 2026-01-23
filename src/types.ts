export enum Factor {
    AutomatedTracking = 'f01',
    ContextLoading = 'f02',
    FocusedAgents = 'f03',
    ContinuousValidation = 'f04',
    MeasureEverything = 'f05',
    ResumeWork = 'f06',
    SmartRouting = 'f07',
    HumanValidation = 'f08',
    MinePatterns = 'f09',
    SmallIterations = 'f10',
    FailSafeChecks = 'f11',
    PackagePatterns = 'f12',
}

export interface FactorScore {
    factor: Factor;
    score: number; // 0-100
    findings: string[];
    suggestions: string[];
}

export interface AssessmentResult {
    scores: FactorScore[];
    overallScore: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

export interface DetectedAgent {
    name: string;
    path: string;
    type: 'agent' | 'skill' | 'server';
    responsibilities: string[];
}

export interface DetectedConfig {
    path: string;
    type: string;
    content: string;
}

export interface DetectedPattern {
    name: string;
    description: string;
    files: string[];
}

export interface AnalysisResult {
    language: 'typescript' | 'python' | 'go' | 'rust' | 'java' | 'unknown';
    agents: DetectedAgent[];
    configs: DetectedConfig[];
    patterns: DetectedPattern[];
    projectType: string;
}

export interface ScaffoldFile {
    path: string;
    content: string;
    overwrite: boolean;
}

export interface ScaffoldResult {
    files: ScaffoldFile[];
    summary: string;
}

export enum ReportFormat {
    JSON = 'json',
    Markdown = 'markdown',
    Terminal = 'terminal',
}
export interface AgentOpsConfig {
    lint?: {
        threshold?: number;
        ignore?: string[];
    };
    context?: {
        maxTokens?: number;
    };
}
