import { Scaffolder, ScaffoldOptions } from '../../core/scaffolder.js';
import { CLIUtils } from '../utils.js';
import path from 'node:path';
import chalk from 'chalk';

export async function scaffoldCommand(targetPath: string, options: ScaffoldOptions): Promise<void> {
    const rootPath = path.resolve(targetPath);
    const stopSpinner = CLIUtils.spinner('Generating scaffold...');

    try {
        const scaffolder = new Scaffolder();
        const result = await scaffolder.scaffold(rootPath, options);
        stopSpinner();

        console.log(chalk.bold(`\n${result.summary}`));
        result.files.forEach(f => {
            const icon = f.overwrite ? '⚡' : '+';
            console.log(`${chalk.green(icon)} ${f.path}`);
        });

        if (!options.apply) {
            console.log(chalk.yellow('\nRun with --apply to write these files to disk.'));
        }

    } catch (err: unknown) {
        if (err instanceof Error) CLIUtils.error(err.message);
    }
}
