import { Assessor } from '../../core/assessor';
import { Reporter } from '../../core/reporter';
import { ReportFormat } from '../../types';
import { CLIUtils } from '../utils';
import path from 'node:path';

export interface AssessOptions {
    format?: string;
}

export async function assessCommand(targetPath: string, options: AssessOptions): Promise<void> {
    const rootPath = path.resolve(targetPath);
    const stopSpinner = CLIUtils.spinner('Assessing 12-Factor AgentOps compliance...');

    try {
        const assessor = new Assessor();
        const result = await assessor.assess(rootPath);
        stopSpinner();

        const reporter = new Reporter();
        let format = ReportFormat.Terminal;
        if (options.format === 'json') format = ReportFormat.JSON;
        if (options.format === 'md' || options.format === 'markdown') format = ReportFormat.Markdown;

        console.log(reporter.format(result, format));

    } catch (err: unknown) {
        if (err instanceof Error) CLIUtils.error(err.message);
    }
}
