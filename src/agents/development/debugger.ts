/**
 * Debugger Agent
 * Investigate issues, analyze logs, diagnose problems
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class DebuggerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'debugger',
            description: 'Investigate issues, analyze logs, diagnose problems',
            category: 'development',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Debugging: ${ctx.currentTask}`);

        try {
            const prompt = `You are an expert debugger. Analyze the following issue and provide:

Issue: ${ctx.currentTask}

${ctx.sharedData.logs ? `Logs:\n${ctx.sharedData.logs}` : ''}
${ctx.sharedData.stackTrace ? `Stack Trace:\n${ctx.sharedData.stackTrace}` : ''}
${ctx.sharedData.code ? `Relevant Code:\n${ctx.sharedData.code}` : ''}

Please provide:
1. Root cause analysis
2. Affected components
3. Step-by-step debugging process
4. Recommended fixes
5. Prevention strategies

Be specific and actionable.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Debug analysis complete');

            return this.createOutput(
                true,
                'Debug analysis complete',
                {
                    analysis: result.content,
                    tokensUsed: result.usage,
                },
                [],
                'tester' // Next agent to verify fix
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Debugging failed: ${message}`);

            return this.createOutput(false, `Debugging failed: ${message}`, {
                error: message,
            });
        }
    }
}

export const debuggerAgent = new DebuggerAgent();
