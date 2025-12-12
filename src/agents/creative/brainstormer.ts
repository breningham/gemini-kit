/**
 * Brainstormer Agent
 * Explore ideas, challenge assumptions, debate decisions
 * Shares ideas with team for planning
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
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
        const teamCtx = getTeamContext();

        logger.agent(this.name, `Brainstorming: ${ctx.currentTask}`);

        try {
            // Get context from team
            let additionalContext = '';
            if (teamCtx) {
                const findings = teamCtx.getFullContext().knowledge.findings;
                if (Object.keys(findings).length > 0) {
                    additionalContext = `\n\nExisting team findings:\n${JSON.stringify(findings, null, 2).slice(0, 500)}`;
                }
            }

            const prompt = `You are a creative brainstorming partner. For the topic below, provide:

Topic: ${ctx.currentTask}
${additionalContext}

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

            // Share with team
            if (teamCtx) {
                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    '💡 Brainstorming complete - ideas shared with team',
                    { hasIdeas: true }
                );

                teamCtx.addArtifact('brainstorm', {
                    name: 'brainstorm-ideas',
                    type: 'analysis',
                    createdBy: this.name,
                    content: result.content.slice(0, 2000),
                });

                teamCtx.addFinding('brainstormIdeas', {
                    topic: ctx.currentTask,
                    ideas: result.content.slice(0, 1500),
                });

                // Handoff to planner
                teamCtx.sendMessage(
                    this.name,
                    'planner',
                    'handoff',
                    'Brainstorming complete. Here are ideas for planning.',
                    { ideasReady: true }
                );
            }

            return this.createOutput(
                true,
                'Brainstorming complete',
                { ideas: result.content },
                [],
                'planner'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Brainstorming failed: ${message}`);
            }

            return this.createOutput(false, message, {});
        }
    }
}

export const brainstormerAgent = new BrainstormerAgent();
