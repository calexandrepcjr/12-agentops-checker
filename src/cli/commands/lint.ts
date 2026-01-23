import { Assessor } from '../../core/assessor.js';
import { CLIUtils } from '../utils.js';
import path from 'node:path';
import chalk from 'chalk';

export interface LintOptions {
    // options
}

export async function lintCommand(targetPath: string, _options: LintOptions): Promise<void> {
    const rootPath = path.resolve(targetPath);
    const stopSpinner = CLIUtils.spinner('Linting AgentOps factors...');

    try {
        // Lint is basically assess but only outputting errors/issues and exit code 1 if failed
        const assessor = new Assessor();
        const result = await assessor.assess(rootPath);
        stopSpinner();

        const failures = result.scores.filter(s => s.score < 50); // arbitrary threshold for "lint fail"

        if (failures.length > 0) {
            console.log(chalk.red('\nLint Failed:'));
            failures.forEach(f => {
                console.log(`✖ [${f.factor}] ${f.findings[0] || 'Low score'}`);
            });
            process.exit(1);
        } else {
            console.log(chalk.green('\nLint Passed!'));
        }

    } catch (err: unknown) {
        if (err instanceof Error) CLIUtils.error(err.message);
    }
}
