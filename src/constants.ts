import { Factor } from './types';

export const FACTORS = [
    {
        id: Factor.AutomatedTracking,
        name: 'Automated Tracking',
        description: 'All operations and state changes are tracked in git',
        category: 'foundation',
    },
    {
        id: Factor.ContextLoading,
        name: 'Context Loading',
        description: 'Context usage is managed and kept under 40%',
        category: 'foundation',
    },
    {
        id: Factor.FocusedAgents,
        name: 'Focused Agents',
        description: 'Agents have single responsibilities',
        category: 'foundation',
    },
    {
        id: Factor.ContinuousValidation,
        name: 'Continuous Validation',
        description: 'Gates exist between all major phases',
        category: 'operations',
    },
    {
        id: Factor.MeasureEverything,
        name: 'Measure Everything',
        description: 'Comprehensive metrics and telemetry',
        category: 'operations',
    },
    {
        id: Factor.ResumeWork,
        name: 'Resume Work',
        description: 'State persistence and checkpointing',
        category: 'operations',
    },
    {
        id: Factor.SmartRouting,
        name: 'Smart Routing',
        description: 'Intelligent task routing to specialized agents',
        category: 'operations',
    },
    {
        id: Factor.HumanValidation,
        name: 'Human Validation',
        description: 'Human approval for critical operations',
        category: 'operations',
    },
    {
        id: Factor.MinePatterns,
        name: 'Mine Patterns',
        description: 'Success patterns are extracted and reused',
        category: 'improvement',
    },
    {
        id: Factor.SmallIterations,
        name: 'Small Iterations',
        description: 'Continuous improvement through small steps',
        category: 'improvement',
    },
    {
        id: Factor.FailSafeChecks,
        name: 'Fail-Safe Checks',
        description: 'Circuit breakers and safety mechanisms',
        category: 'improvement',
    },
    {
        id: Factor.PackagePatterns,
        name: 'Package Patterns',
        description: 'Patterns are packaged for reuse',
        category: 'improvement',
    },
];

export const FACTOR_CATEGORIES = {
    foundation: 'Foundation',
    operations: 'Operations',
    improvement: 'Improvement',
};

export const DETECTION_PATTERNS = {
    agent: ['**/agents/**/*.ts', '**/agents/**/*.py', '**/skills/**/*.ts', '**/skills/**/*.py'],
    config: ['.agentops.*', 'agentops.config.*', '.agentops/**/*.json', '.agentops/**/*.yaml', '.agentops/**/*.yml'],
    ci: ['.github/workflows/*.yml', '.gitlab-ci.yml'],
    docker: ['Dockerfile', 'docker-compose.yml'],
};

export const SCORE_THRESHOLDS = {
    A: 90,
    B: 80,
    C: 70,
    D: 60,
};
