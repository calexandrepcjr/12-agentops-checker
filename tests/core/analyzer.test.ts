import { Analyzer } from '../../src/core/analyzer';
import { TS_REPO, PY_REPO, EMPTY_REPO } from '../setup';

describe('Analyzer', () => {
    const analyzer = new Analyzer();

    it('should detect typescript project', async () => {
        const result = await analyzer.analyze(TS_REPO);
        expect(result.language).toBe('typescript');
    });

    it('should detect python project', async () => {
        const result = await analyzer.analyze(PY_REPO);
        expect(result.language).toBe('python');
    });

    it('should handle empty repo', async () => {
        const result = await analyzer.analyze(EMPTY_REPO);
        expect(result.language).toBe('unknown');
        expect(result.agents).toHaveLength(0);
    });
});
