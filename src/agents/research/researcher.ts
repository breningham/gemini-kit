/**
 * Researcher Agent
 * Multi-source research with documentation analysis
 * Shares research findings with team for planning
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
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
        const teamCtx = getTeamContext();

        logger.agent(this.name, `Researching: ${ctx.currentTask}`);

        try {
            // Get context from team
            let additionalContext = '';
            if (teamCtx) {
                const codebaseFiles = teamCtx.getFullContext().knowledge.codebaseInfo.relevantFiles;
                if (codebaseFiles.length > 0) {
                    additionalContext = `\n\nProject has these relevant files:\n${codebaseFiles.slice(0, 5).join('\n')}`;
                }
            }

            const prompt = `You are a technical researcher. Research the following:

Topic: ${ctx.currentTask}
${additionalContext}

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

            // Share with team
            if (teamCtx) {
                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    '🔍 Research complete - findings shared with team',
                    { hasResearch: true }
                );

                teamCtx.addArtifact('research', {
                    name: 'research-findings',
                    type: 'analysis',
                    createdBy: this.name,
                    content: result.content.slice(0, 2000),
                });

                teamCtx.addFinding('researchResults', {
                    topic: ctx.currentTask,
                    findings: result.content.slice(0, 1500),
                });

                // Handoff to planner
                teamCtx.sendMessage(
                    this.name,
                    'planner',
                    'handoff',
                    'Research complete. Findings ready for planning.',
                    { researchReady: true }
                );
            }

            return this.createOutput(
                true,
                'Research complete',
                { research: result.content },
                [],
                'planner'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Research failed: ${message}`);
            }

            return this.createOutput(false, message, {});
        }
    }
}

export const researcherAgent = new ResearcherAgent();
