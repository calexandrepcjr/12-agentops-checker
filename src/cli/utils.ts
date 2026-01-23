import chalk from 'chalk';
import readline from 'node:readline';

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
}
