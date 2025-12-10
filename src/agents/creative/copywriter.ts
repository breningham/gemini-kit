/**
 * Copywriter Agent
 * Create high-converting marketing copy
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class CopywriterAgent extends BaseAgent {
    constructor() {
        super({
            name: 'copywriter',
            description: 'Create high-converting marketing copy',
            category: 'creative',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Writing copy: ${ctx.currentTask}`);

        try {
            const prompt = `You are an expert copywriter. Create compelling copy for:

Task: ${ctx.currentTask}

Provide multiple versions:
1. **Headlines** (3 options)
2. **Subheadlines** (3 options)
3. **Body Copy** (short, medium, long versions)
4. **Call-to-Action** (3 options)
5. **SEO Meta Description**

Focus on benefits, use power words, create urgency.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Copy created');

            return this.createOutput(
                true,
                'Copy created',
                { copy: result.content },
                []
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, message, {});
        }
    }
}

export const copywriterAgent = new CopywriterAgent();
