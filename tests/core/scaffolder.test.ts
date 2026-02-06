import { Scaffolder } from '../../src/core/scaffolder';
import { TS_REPO } from '../setup';

describe('Scaffolder', () => {
    const scaffolder = new Scaffolder();

    it('should generate files in dry-run mode', async () => {
        const result = await scaffolder.scaffold(TS_REPO, { dryRun: true });
        expect(result.files.length).toBeGreaterThan(0);
        const claudeMd = result.files.find(f => f.path === 'CLAUDE.md');
        expect(claudeMd).toBeDefined();
    });

    it('includes agentic harness defaults in generated config', async () => {
        const result = await scaffolder.scaffold(TS_REPO, { dryRun: true });
        const configFile = result.files.find(f => f.path === '.agentops.config.json');

        expect(configFile).toBeDefined();
        expect(configFile?.content).toContain('selfVerification');
        expect(configFile?.content).toContain('webSearch');
        expect(configFile?.content).toContain('pdfParsing');
    });
});
