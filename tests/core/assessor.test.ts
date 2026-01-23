import { Assessor } from '../../src/core/assessor';
import { PARTIAL_REPO, EMPTY_REPO } from '../setup';

describe('Assessor', () => {
    const assessor = new Assessor();

    it('should assess partial repo', async () => {
        const result = await assessor.assess(PARTIAL_REPO);
        expect(result.overallScore).toBeGreaterThan(0);
        expect(result.grade).not.toBe('F'); // Should have some points
    });

    it('should fail empty repo', async () => {
        const result = await assessor.assess(EMPTY_REPO);
        expect(result.grade).toBe('F');
        expect(result.overallScore).toBeLessThan(50);
    });
});
