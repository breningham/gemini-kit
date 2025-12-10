/**
 * Docs Manager Agent
 * Manage technical documentation and standards
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { logger } from '../../utils/logger.js';

export class DocsManagerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'docs-manager',
            description: 'Manage technical documentation and standards',
            category: 'documentation',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, 'Updating documentation...');

        try {
            const docsDir = join(ctx.projectRoot, 'docs');
            if (!existsSync(docsDir)) {
                mkdirSync(docsDir, { recursive: true });
            }

            // Generate API documentation
            const prompt = `Generate a brief documentation update for this task:

Task: ${ctx.currentTask}

Previous agent results:
${JSON.stringify(ctx.previousAgentOutput?.data, null, 2).slice(0, 2000)}

Provide a short markdown section documenting what was changed.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            const changelogPath = join(docsDir, 'CHANGELOG.md');
            const entry = `
## ${new Date().toISOString().split('T')[0]}

### ${ctx.currentTask}

${result.content}

---
`;

            writeFileSync(changelogPath, entry, { flag: 'a' });
            logger.success('Documentation updated');

            return this.createOutput(
                true,
                'Documentation updated',
                { changelogPath },
                [changelogPath],
                'git-manager'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, `Docs update failed: ${message}`, {});
        }
    }
}

export const docsManagerAgent = new DocsManagerAgent();
