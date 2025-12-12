/**
 * UI/UX Designer Agent
 * Design interfaces, wireframes, and user experiences
 * Shares design specs with Coder for implementation
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class UiUxDesignerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'ui-ux-designer',
            description: 'Design interfaces, wireframes, and user experiences',
            category: 'creative',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        const teamCtx = getTeamContext();

        logger.agent(this.name, `Designing: ${ctx.currentTask}`);

        try {
            // Get context from team
            let additionalContext = '';
            if (teamCtx) {
                // Check for plan or brainstorm ideas
                const artifacts = Array.from(teamCtx.getFullContext().artifacts.values());
                const planArtifact = artifacts.find(a => a.type === 'plan');
                const brainstormArtifact = artifacts.find(a => a.name === 'brainstorm-ideas');

                if (planArtifact && planArtifact.content) {
                    additionalContext += `\n\nImplementation Plan:\n${String(planArtifact.content).slice(0, 500)}`;
                }
                if (brainstormArtifact && brainstormArtifact.content) {
                    additionalContext += `\n\nBrainstorm Ideas:\n${String(brainstormArtifact.content).slice(0, 500)}`;
                }
            }

            const prompt = `You are a senior UI/UX designer. Create a design specification for:

Task: ${ctx.currentTask}
${additionalContext}

Provide:
1. **User Flow** - How users will interact
2. **Component Structure** - React/Vue component hierarchy
3. **Design Tokens** - Colors, spacing, typography
4. **Responsive Behavior** - Mobile, tablet, desktop
5. **Accessibility** - WCAG considerations
6. **CSS/Tailwind Classes** - Suggested styling

Include ASCII wireframes where helpful.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Design specification complete');

            // Share with team
            if (teamCtx) {
                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    '🎨 Design specification complete',
                    { hasDesign: true }
                );

                teamCtx.addArtifact('design-spec', {
                    name: 'ui-ux-design',
                    type: 'doc',
                    createdBy: this.name,
                    content: result.content.slice(0, 2000),
                });

                teamCtx.addFinding('designSpec', {
                    task: ctx.currentTask,
                    design: result.content.slice(0, 1500),
                });

                // Handoff to coder
                teamCtx.sendMessage(
                    this.name,
                    'coder',
                    'handoff',
                    'Design spec ready. Use these specifications for implementation.',
                    { designReady: true }
                );
            }

            return this.createOutput(
                true,
                'Design specification created',
                { design: result.content },
                [],
                'coder'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Design failed: ${message}`);
            }

            return this.createOutput(false, message, {});
        }
    }
}

export const uiUxDesignerAgent = new UiUxDesignerAgent();
