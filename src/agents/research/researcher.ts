/**
 * Researcher Agent
 * Multi-source research with documentation analysis
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class ResearcherAgent extends BaseAgent {
    constructor() {
        super({
            name: 'researcher',
            description: 'Multi-source research with documentation analysis',
            category: 'research',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Researching: ${ctx.currentTask}`);

        try {
            const prompt = `You are a technical researcher. Research the following:

Topic: ${ctx.currentTask}

Provide:
1. **Overview** - What is it and why is it important
2. **Best Practices** - Industry standards
3. **Common Patterns** - How others solve this
4. **Potential Pitfalls** - What to avoid
5. **Recommended Libraries/Tools** - With brief pros/cons
6. **References** - Where to learn more

Be thorough but concise.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Research complete');

            return this.createOutput(
                true,
                'Research complete',
                { research: result.content },
                [],
                'planner'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, message, {});
        }
    }
}

export const researcherAgent = new ResearcherAgent();
