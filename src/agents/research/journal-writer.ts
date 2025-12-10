/**
 * Journal Writer Agent
 * Document technical difficulties and project journey
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { logger } from '../../utils/logger.js';

export class JournalWriterAgent extends BaseAgent {
    constructor() {
        super({
            name: 'journal-writer',
            description: 'Document technical difficulties and project journey',
            category: 'research',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, 'Writing journal entry...');

        try {
            const journalsDir = join(ctx.projectRoot, 'journals');
            if (!existsSync(journalsDir)) {
                mkdirSync(journalsDir, { recursive: true });
            }

            const today = new Date().toISOString().split('T')[0];
            const journalPath = join(journalsDir, `${today}.md`);

            // Read existing journal if exists
            let existingContent = '';
            if (existsSync(journalPath)) {
                existingContent = readFileSync(journalPath, 'utf-8');
            }

            const prompt = `You are a technical journal writer. Write a journal entry for:

Task: ${ctx.currentTask}
Previous Agent Output: ${JSON.stringify(ctx.previousAgentOutput?.data, null, 2).slice(0, 1000)}

Existing journal today:
${existingContent.slice(0, 500)}

Write a brief journal entry covering:
1. What was done
2. Challenges encountered
3. Solutions applied
4. Lessons learned
5. Next steps

Keep it concise but informative.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            const entry = `
## ${new Date().toLocaleTimeString()}

${result.content}

---
`;

            writeFileSync(journalPath, existingContent + entry);
            logger.success(`Journal entry saved: ${journalPath}`);

            return this.createOutput(
                true,
                'Journal entry created',
                { journalPath },
                [journalPath]
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, message, {});
        }
    }
}

export const journalWriterAgent = new JournalWriterAgent();
