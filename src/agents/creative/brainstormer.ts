/**
 * Brainstormer Agent
 * Explore ideas, challenge assumptions, debate decisions
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class BrainstormerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'brainstormer',
            description: 'Explore ideas, challenge assumptions, debate decisions',
            category: 'creative',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Brainstorming: ${ctx.currentTask}`);

        try {
            const prompt = `You are a creative brainstorming partner. For the topic below, provide:

Topic: ${ctx.currentTask}

1. **Multiple Approaches** (at least 3 different ways to solve this)
2. **Pros and Cons** of each approach
3. **Out-of-the-box Ideas** (unconventional solutions)
4. **Potential Challenges** and how to overcome them
5. **Recommended Approach** with justification

Be creative and thorough.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Brainstorming complete');

            return this.createOutput(
                true,
                'Brainstorming complete',
                { ideas: result.content },
                [],
                'planner'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, message, {});
        }
    }
}

export const brainstormerAgent = new BrainstormerAgent();
