/**
 * Coder Agent
 * Writes code following implementation plans and team context
 * Acts as the Junior Developer - receives plan from Planner, files from Scout
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

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
        const teamCtx = getTeamContext();

        logger.agent(this.name, `Writing code for: ${ctx.currentTask}`);

        try {
            // Get context from team
            let planContent = ctx.sharedData.planContent || '';
            let relevantFiles: string[] = [];
            let scoutFindings = '';

            if (teamCtx) {
                // Get plan from planner artifact
                const artifacts = Array.from(teamCtx.getFullContext().artifacts.values());
                const planArtifact = artifacts.find(a => a.type === 'plan');
                if (planArtifact && planArtifact.content) {
                    planContent = String(planArtifact.content);
                    logger.info(`📋 Received plan from Planner`);
                }

                // Get relevant files from scout
                relevantFiles = teamCtx.getFullContext().knowledge.codebaseInfo.relevantFiles;
                if (relevantFiles.length > 0) {
                    logger.info(`📁 Scout found ${relevantFiles.length} relevant files`);
                    scoutFindings = `\n\nRelevant files to reference:\n${relevantFiles.slice(0, 10).join('\n')}`;
                }

                // Check for handoff
                const handoff = teamCtx.getLastHandoff();
                if (handoff && handoff.to === this.name) {
                    logger.info(`📨 Handoff from ${handoff.from}: ${handoff.content}`);
                }
            }

            const prompt = `You are an expert software engineer. Write high-quality code for:

## Task
${ctx.currentTask}

## Implementation Plan
${planContent || 'No plan provided - use best judgment'}
${scoutFindings}

## Requirements
1. Follow best practices and coding standards
2. Write clean, readable, maintainable code
3. Include proper error handling
4. Add helpful comments
5. Use TypeScript with strict types
6. Follow SOLID principles

Provide complete, working code files. Format as:
## File: path/to/file.ts
\`\`\`typescript
// code here
\`\`\``;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Code generated successfully');

            // Report to team
            if (teamCtx) {
                teamCtx.updateProgress('implemented', true);

                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    '💻 Code generated successfully',
                    { codeGenerated: true }
                );

                teamCtx.addArtifact('generated-code', {
                    name: 'coder-output',
                    type: 'code',
                    createdBy: this.name,
                    content: result.content.slice(0, 2000),
                });

                // Handoff to tester
                teamCtx.sendMessage(
                    this.name,
                    'tester',
                    'handoff',
                    'Code is ready. Please test the implementation.',
                    { codeReady: true }
                );
            }

            return this.createOutput(
                true,
                'Code generated successfully',
                { code: result.content },
                [],
                'tester'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logger.error(`Code generation failed: ${message}`);

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Coder failed: ${message}`);
            }

            return this.createOutput(
                false,
                `Code generation failed: ${message}`,
                {},
                []
            );
        }
    }
}

export const coderAgent = new CoderAgent();
