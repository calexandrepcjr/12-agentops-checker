import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';

export abstract class BaseDetector<T> {
    abstract detect(rootPath: string): Promise<T>;

    protected async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    protected async readFile(filePath: string): Promise<string | null> {
        try {
            return await fs.readFile(filePath, 'utf-8');
        } catch {
            return null;
        }
    }

    protected async globFiles(pattern: string, rootPath: string): Promise<string[]> {
        return glob(pattern, { cwd: rootPath, ignore: ['**/node_modules/**', '**/dist/**'] });
    }

    protected joinPath(rootPath: string, ...paths: string[]): string {
        return path.join(rootPath, ...paths);
    }
}
