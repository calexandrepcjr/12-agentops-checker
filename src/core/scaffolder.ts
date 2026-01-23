import { ScaffoldResult, ScaffoldFile } from '../types';
import { generateAll } from '../generators/index';
import { Analyzer } from './analyzer';
import fs from 'node:fs/promises';
import path from 'node:path';

export interface ScaffoldOptions {
    dryRun?: boolean;
    apply?: boolean;
}

export class Scaffolder {
    async scaffold(rootPath: string, options: ScaffoldOptions): Promise<ScaffoldResult> {
        // 1. Generate files
        const files = generateAll(await new Analyzer().analyze(rootPath), options);

        // 2. Write files if apply is true
        if (options.apply) {
            for (const file of files) {
                const fullPath = path.join(rootPath, file.path);
                await fs.mkdir(path.dirname(fullPath), { recursive: true });
                if (file.overwrite || !(await this.fileExists(fullPath))) {
                    await fs.writeFile(fullPath, file.content);
                }
            }
        }

        const summary = `Generated ${files.length} scaffold files.`;

        return {
            files,
            summary
        };
    }

    private async fileExists(path: string): Promise<boolean> {
        try {
            await fs.access(path);
            return true;
        } catch {
            return false;
        }
    }
}
