import { AutomatedTrackingFactor } from '../../src/factors/f01-automated-tracking';
import { FocusedAgentsFactor } from '../../src/factors/f03-focused-agents';
import { PackagePatternsFactor } from '../../src/factors/f12-package-patterns';
import { AnalysisResult } from '../../src/types';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

describe('Factors', () => {
    const mockAnalysis: AnalysisResult = {
        language: 'typescript',
        agents: [],
        configs: [],
        patterns: [],
        projectType: 'unknown'
    };

    it('given automated tracking factor, exposes f01 identifier', async () => {
        const factor = new AutomatedTrackingFactor();
        // We mock file access by creating a temp dir or mocking fs. 
        // Here we might test logic abstractly if possible or integration.
        // Given we are doing integration tests on fixtures separately, 
        // let's do unit test on logic where possible or rely on fixtures.
        expect(factor.factorId).toBe('f01');
    });

    it('given no agents, returns score 0 for f03', async () => {
        const factor = new FocusedAgentsFactor();
        const score = await factor.check(mockAnalysis, '/tmp');
        expect(score.score).toBe(0);
    });

    it('given no package indicators, suggests packaging setup for f12', async () => {
        const factor = new PackagePatternsFactor();
        const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'agentops-factor-'));

        try {
            const score = await factor.check(mockAnalysis, tempDir);
            expect(score.score).toBe(0);
            expect(score.suggestions).toContain('Configure project for packaging (package.json/setup.py) to share patterns');
        } finally {
            await fs.rm(tempDir, { recursive: true, force: true });
        }
    });

    it('given package.json exists, marks project as packagable for f12', async () => {
        const factor = new PackagePatternsFactor();
        const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'agentops-factor-'));

        try {
            await fs.writeFile(path.join(tempDir, 'package.json'), '{"name":"demo"}');
            const score = await factor.check(mockAnalysis, tempDir);
            expect(score.score).toBe(50);
            expect(score.findings).toContain('Project appears to be configured for packaging (npm/pypi)');
        } finally {
            await fs.rm(tempDir, { recursive: true, force: true });
        }
    });
});
