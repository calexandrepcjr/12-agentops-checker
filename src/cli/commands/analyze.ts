import { Analyzer } from '../../core/analyzer.js';
import { CLIUtils } from '../utils.js';
import path from 'node:path';
import chalk from 'chalk';

export interface AnalyzeOptions {
    // No options for now
}

export async function analyzeCommand(targetPath: string, _options: AnalyzeOptions): Promise<void> {
    const rootPath = path.resolve(targetPath);
    const stopSpinner = CLIUtils.spinner('Analyzing codebase...');

    try {
        const analyzer = new Analyzer();
        const result = await analyzer.analyze(rootPath);
        stopSpinner();

        console.log(chalk.bold('\nAnalysis Result:'));
        console.log(`Language: ${chalk.green(result.language)}`);
        console.log(`Project Type: ${chalk.green(result.projectType)}`);
        console.log(`Agents Found: ${chalk.green(result.agents.length)}`);
        if (result.agents.length > 0) {
            result.agents.forEach(a => console.log(`  - ${a.name} (${a.type})`));
        }
        console.log(`Patterns Found: ${chalk.green(result.patterns.length)}`);
        console.log(`Configs Found: ${chalk.green(result.configs.length)}`);

    } catch (err: unknown) {
        // stopSpinner might have run, but if error inside spinner??
        // simplified handling
        if (err instanceof Error) CLIUtils.error(err.message);
    }
}
