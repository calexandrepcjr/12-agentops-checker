import { ToolSchema } from '@modelcontextprotocol/sdk/types.js';

export const AGENTOPS_ANALYZE_TOOL = {
    name: 'agentops_analyze',
    description: 'Analyze codebase structure to detect agents, configs, languages, and patterns',
    inputSchema: {
        type: 'object',
        properties: {
            path: {
                type: 'string',
                description: 'Absolute path to the codebase to analyze',
            },
        },
        required: ['path'],
    },
};

export const AGENTOPS_ASSESS_TOOL = {
    name: 'agentops_assess',
    description: 'Assess codebase against 12-factor AgentOps principles',
    inputSchema: {
        type: 'object',
        properties: {
            path: {
                type: 'string',
                description: 'Absolute path to the codebase to assess',
            },
        },
        required: ['path'],
    },
};

export const AGENTOPS_SCAFFOLD_TOOL = {
    name: 'agentops_scaffold',
    description: 'Generate missing agentops structure and files (dry-run by default)',
    inputSchema: {
        type: 'object',
        properties: {
            path: {
                type: 'string',
                description: 'Absolute path to the codebase',
            },
            apply: {
                type: 'boolean',
                description: 'Whether to write files to disk (default: false)',
            },
        },
        required: ['path'],
    },
};

export const AGENTOPS_LINT_TOOL = {
    name: 'agentops_lint',
    description: 'Lint the codebase for critical AgentOps issues',
    inputSchema: {
        type: 'object',
        properties: {
            path: {
                type: 'string',
                description: 'Absolute path to the codebase',
            },
        },
        required: ['path'],
    },
};
