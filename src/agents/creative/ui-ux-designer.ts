/**
 * UI/UX Designer Agent
 * Design interfaces, wireframes, and user experiences
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
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
        logger.agent(this.name, `Designing: ${ctx.currentTask}`);

        try {
            const prompt = `You are a senior UI/UX designer. Create a design specification for:

Task: ${ctx.currentTask}

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

            return this.createOutput(
                true,
                'Design specification created',
                { design: result.content },
                []
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, message, {});
        }
    }
}

export const uiUxDesignerAgent = new UiUxDesignerAgent();
