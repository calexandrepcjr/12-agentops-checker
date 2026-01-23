import { Assessor } from '../../src/core/assessor';
import { PARTIAL_REPO, EMPTY_REPO } from '../setup';

describe('Assessor', () => {
    const assessor = new Assessor();

    it('should assess partial repo', async () => {
        const result = await assessor.assess(PARTIAL_REPO);
        const f02 = result.scores.find(s => s.factor === 'f02');
        const f03 = result.scores.find(s => s.factor === 'f03');

        expect(result.overallScore).toBeGreaterThan(0);
        expect(f02?.score).toBe(80);
        expect(f03?.score).toBe(50);
    });

    it('should fail empty repo', async () => {
        const result = await assessor.assess(EMPTY_REPO);
        expect(result.grade).toBe('F');
        expect(result.overallScore).toBeLessThan(50);
    });
});
