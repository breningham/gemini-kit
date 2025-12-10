/**
 * Code Reviewer Agent
 * Comprehensive code review and quality assessment
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';
import { readFileSync } from 'fs';

export class CodeReviewerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'code-reviewer',
            description: 'Comprehensive code review and quality assessment',
            category: 'quality',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, 'Reviewing code...');

        try {
            // Get files from previous agent output
            const filesToReview = ctx.previousAgentOutput?.artifacts ?? [];

            if (filesToReview.length === 0) {
                return this.createOutput(
                    true,
                    'No files to review',
                    {},
                    [],
                    'docs-manager'
                );
            }

            const reviews: Array<{ file: string; review: string }> = [];

            for (const file of filesToReview.slice(0, 5)) {
                // Limit to 5 files
                try {
                    const content = readFileSync(file, 'utf-8');

                    const prompt = `Review the following code and provide:
1. Code quality assessment (1-10)
2. Security concerns
3. Performance issues
4. Best practice violations
5. Suggested improvements

File: ${file}
\`\`\`
${content.slice(0, 5000)}
\`\`\``;

                    const result = await providerManager.generate([
                        { role: 'user', content: prompt },
                    ]);

                    reviews.push({ file, review: result.content });
                } catch {
                    reviews.push({ file, review: 'Could not read file' });
                }
            }

            logger.success(`Reviewed ${reviews.length} files`);

            return this.createOutput(
                true,
                `Reviewed ${reviews.length} files`,
                { reviews },
                [],
                'docs-manager'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, `Review failed: ${message}`, {});
        }
    }
}

export const codeReviewerAgent = new CodeReviewerAgent();
