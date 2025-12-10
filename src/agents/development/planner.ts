/**
 * Planner Agent
 * Research, analyze, and create implementation plans
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { logger } from '../../utils/logger.js';

export class PlannerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'planner',
            description: 'Research, analyze, and create implementation plans',
            category: 'development',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Planning: ${ctx.currentTask}`);

        try {
            // Generate plan using AI
            const prompt = `You are a senior software architect. Create a detailed implementation plan for the following task:

Task: ${ctx.currentTask}

Project Root: ${ctx.projectRoot}

Please provide:
1. Overview of the task
2. Technical approach
3. Files to create/modify
4. Step-by-step implementation
5. Testing strategy
6. Potential challenges

Format the plan in Markdown.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            // Save plan to file
            const planName = ctx.currentTask
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .slice(0, 50);
            const planPath = join(ctx.projectRoot, 'plans', `${planName}.md`);
            const planDir = dirname(planPath);

            if (!existsSync(planDir)) {
                mkdirSync(planDir, { recursive: true });
            }

            const planContent = `# Implementation Plan: ${ctx.currentTask}

Generated: ${new Date().toISOString()}
Model: ${result.model} (${result.provider})

---

${result.content}
`;

            writeFileSync(planPath, planContent);
            logger.success(`Plan saved to: ${planPath}`);

            return this.createOutput(
                true,
                `Implementation plan created successfully`,
                {
                    planPath,
                    planContent: result.content,
                    tokensUsed: result.usage,
                },
                [planPath],
                'scout' // Next agent
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Planning failed: ${message}`);

            return this.createOutput(false, `Planning failed: ${message}`, {
                error: message,
            });
        }
    }
}

export const plannerAgent = new PlannerAgent();
