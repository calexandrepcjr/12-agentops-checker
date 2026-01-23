import { AssessmentResult, ReportFormat } from '../types';
import chalk from 'chalk';

export class Reporter {
    format(result: AssessmentResult, format: ReportFormat): string {
        switch (format) {
            case ReportFormat.JSON:
                return JSON.stringify(result, null, 2);
            case ReportFormat.Markdown:
                return this.formatMarkdown(result);
            case ReportFormat.Terminal:
            default:
                return this.formatTerminal(result);
        }
    }

    private formatMarkdown(result: AssessmentResult): string {
        let md = `# AgentOps Assessment Report\n\n`;
        md += `**Overall Score:** ${result.overallScore}/100 (Grade: ${result.grade})\n\n`;
        md += `## Factor Breakdown\n\n`;

        for (const score of result.scores) {
            md += `### ${score.factor}: ${score.score}/100\n`;
            if (score.findings.length > 0) {
                md += `**Findings:**\n${score.findings.map(f => `- ${f}`).join('\n')}\n`;
            }
            if (score.suggestions.length > 0) {
                md += `**Suggestions:**\n${score.suggestions.map(s => `- ${s}`).join('\n')}\n`;
            }
            md += '\n';
        }
        return md;
    }

    private formatTerminal(result: AssessmentResult): string {
        let output = '';

        // Grade Color
        let gradeColor = chalk.red;
        if (result.grade === 'A') gradeColor = chalk.green;
        else if (result.grade === 'B') gradeColor = chalk.blue;
        else if (result.grade === 'C') gradeColor = chalk.yellow;

        output += chalk.bold(`\nAgentOps Assessment Report\n`);
        output += `Overall Score: ${chalk.bold(result.overallScore)} (Grade: ${gradeColor(chalk.bold(result.grade))})\n\n`;

        for (const score of result.scores) {
            let scoreColor = chalk.red;
            if (score.score >= 90) scoreColor = chalk.green;
            else if (score.score >= 70) scoreColor = chalk.yellow;

            output += chalk.bold(`${score.factor}: ${scoreColor(score.score)}\n`);

            if (score.findings.length > 0) {
                output += chalk.cyan(`  Findings:\n`);
                score.findings.forEach(f => output += `    - ${f}\n`);
            }
            if (score.suggestions.length > 0) {
                output += chalk.gray(`  Suggestions:\n`);
                score.suggestions.forEach(s => output += `    - ${s}\n`);
            }
            output += '\n';
        }

        return output;
    }
}
