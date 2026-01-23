#!/usr/bin/env node
import { Command } from 'commander';
import { analyzeCommand } from './commands/analyze';
import { assessCommand } from './commands/assess';
import { scaffoldCommand } from './commands/scaffold';
import { lintCommand } from './commands/lint';

const program = new Command();

program
    .name('agentops-check')
    .description('Universal 12-Factor AgentOps analyzer and scaffolder')
    .version('1.0.0');

program.command('analyze')
    .description('Analyze codebase structure')
    .argument('<path>', 'Path to codebase')
    .action(analyzeCommand);

program.command('assess')
    .description('Assess compliance with 12 factors')
    .argument('<path>', 'Path to codebase')
    .option('-f, --format <format>', 'Output format (json, md, terminal)', 'terminal')
    .action(assessCommand);

program.command('scaffold')
    .description('Generate missing AgentOps structure')
    .argument('<path>', 'Path to codebase')
    .option('--apply', 'Write files to disk')
    .option('--dry-run', 'Simulate generation', true) // defaults to true if apply only acts if present? No, option default logic is cleaner
    .action((path, options) => {
        // If apply is present, dryRun should be false, unless explicitly set
        // Actually Commander handles bool flags.
        // logic: default dry-run is implicit if apply is missing.
        scaffoldCommand(path, options);
    });

program.command('lint')
    .description('Check for critical AgentOps issues')
    .argument('<path>', 'Path to codebase')
    .action(lintCommand);

program.parse();
