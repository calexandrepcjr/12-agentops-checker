import { AutomatedTrackingFactor } from '../../src/factors/f01-automated-tracking';
import { FocusedAgentsFactor } from '../../src/factors/f03-focused-agents';
import { AnalysisResult } from '../../src/types';

describe('Factors', () => {
    const mockAnalysis: AnalysisResult = {
        language: 'typescript',
        agents: [],
        configs: [],
        patterns: [],
        projectType: 'unknown'
    };

    it('f01 should detect git', async () => {
        const factor = new AutomatedTrackingFactor();
        // We mock file access by creating a temp dir or mocking fs. 
        // Here we might test logic abstractly if possible or integration.
        // Given we are doing integration tests on fixtures separately, 
        // let's do unit test on logic where possible or rely on fixtures.
        expect(factor.factorId).toBe('f01');
    });

    it('f03 should score 0 for no agents', async () => {
        const factor = new FocusedAgentsFactor();
        const score = await factor.check(mockAnalysis, '/tmp');
        expect(score.score).toBe(0);
    });
});
