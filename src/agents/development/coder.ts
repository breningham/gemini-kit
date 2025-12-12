/**
 * Coder Agent
 * Writes code following implementation plans and standards
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';

class CoderAgent extends BaseAgent {
    constructor() {
        super({
            name: 'coder',
            description: 'Writes code following implementation plans and coding standards',
            category: 'development',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        console.log(`🤖 [${this.name}] Writing code for: ${ctx.currentTask}`);

        try {
            const prompt = `You are an expert software engineer. Write high-quality code for:

Task: ${ctx.currentTask}

Requirements:
1. Follow best practices and coding standards
2. Write clean, readable, maintainable code
3. Include proper error handling
4. Add helpful comments
5. Use TypeScript with strict types
6. Follow SOLID principles

Project context:
${ctx.sharedData.planContent || 'No plan provided'}

Provide complete, working code files. Format as:
## File: path/to/file.ts
\`\`\`typescript
// code here
\`\`\``;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            return this.createOutput(
                true,
                'Code generated successfully',
                { code: result.content },
                [],
                'tester'
            );
        } catch (error) {
            return this.createOutput(
                false,
                `Code generation failed: ${error}`,
                {},
                [`Error: ${error}`]
            );
        }
    }
}

export const coderAgent = new CoderAgent();
