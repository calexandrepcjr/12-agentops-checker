import chalk from 'chalk';
import readline from 'node:readline';
import fs from 'node:fs/promises';
import path from 'node:path';
import { AgentOpsConfig } from '../types';

export class CLIUtils {
    static async prompt(question: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise(resolve => {
            rl.question(chalk.cyan(`? ${question} `), (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }

    static spinner(message: string): () => void {
        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let i = 0;
        process.stdout.write('\u001b[?25l'); // Hide cursor

        const interval = setInterval(() => {
            process.stdout.write(`\r${chalk.cyan(frames[i++ % frames.length])} ${message}`);
        }, 80);

        return () => {
            clearInterval(interval);
            process.stdout.write('\u001b[?25h'); // Show cursor
            process.stdout.write(`\r${chalk.green('✔')} ${message}\n`);
        };
    }

    static error(message: string): void {
        console.error(chalk.red(`\n✖ ${message}`));
        process.exit(1);
    }

    static async loadConfig(rootPath: string): Promise<AgentOpsConfig> {
        try {
            // Check for agentops.config.json or .agentops/config.json
            const configPaths = [
                path.join(rootPath, 'agentops.config.json'),
                path.join(rootPath, '.agentops/config.json')
            ];

            for (const p of configPaths) {
                try {
                    await fs.access(p);
                    const content = await fs.readFile(p, 'utf-8');
                    return JSON.parse(content);
                } catch {
                    continue;
                }
            }

            // Check package.json
            try {
                const pkgPath = path.join(rootPath, 'package.json');
                await fs.access(pkgPath);
                const content = await fs.readFile(pkgPath, 'utf-8');
                const pkg = JSON.parse(content);
                if (pkg.agentops) {
                    return pkg.agentops;
                }
            } catch {
                // ignore
            }

            return {};
        } catch (error) {
            return {};
        }
    }
}
