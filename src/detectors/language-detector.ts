import { BaseDetector } from './base-detector.js';
import { AnalysisResult } from '../types.js';

interface LanguageIndicator {
    language: AnalysisResult['language'];
    file: string;
}

export class LanguageDetector extends BaseDetector<AnalysisResult['language']> {
    async detect(rootPath: string): Promise<AnalysisResult['language']> {
        const indicators: LanguageIndicator[] = [
            { language: 'typescript', file: 'package.json' },
            { language: 'python', file: 'requirements.txt' },
            { language: 'python', file: 'pyproject.toml' },
            { language: 'python', file: 'Pipfile' },
            { language: 'go', file: 'go.mod' },
            { language: 'rust', file: 'Cargo.toml' },
            { language: 'java', file: 'pom.xml' },
            { language: 'java', file: 'build.gradle' },
        ];

        for (const indicator of indicators) {
            if (await this.fileExists(this.joinPath(rootPath, indicator.file))) {
                return indicator.language;
            }
        }

        // Secondary check for TS vs JS if package.json exists but maybe it's just JS
        if (await this.fileExists(this.joinPath(rootPath, 'package.json'))) {
            const tsConfig = await this.fileExists(this.joinPath(rootPath, 'tsconfig.json'));
            return tsConfig ? 'typescript' : 'typescript'; // Defaulting to 'typescript' as per prompt instructions, but technically could be JS. Treating node projects as TS ecosystem broadly or checking for .ts files could be improvements, but adhering to simple file checks for now. 
            // Actually, prompt says: Check for package.json -> TypeScript/JavaScript.
            // Let's refine:
            // If tsconfig.json -> typescript
            // If package.json -> javascript if no tsconfig (but prompt groups them, let's return typescript as generic node env or differentiate if needed. PROMPT says: "Check for package.json -> TypeScript/JavaScript". AnalysisResult type has 'typescript' but not 'javascript'. I'll stick to 'typescript' or add 'javascript' to types if I could, but types are fixed in batch 2.
            // Wait, AnalysisResult in Batch 2 Type definition has: language: 'typescript' | 'python' | 'go' | 'rust' | 'java' | 'unknown';
            // It does NOT have 'javascript'. So I will return 'typescript' for package.json presence as a proxy for Node/TS ecosystem.
        }

        return 'unknown';
    }
}
