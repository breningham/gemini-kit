/**
 * Debugger Agent
 * Investigate issues, analyze logs, diagnose and fix problems
 * Acts as the Bug Fixer - receives issues from Tester
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class DebuggerAgent extends BaseAgent {
    constructor() {
        super({
            name: 'debugger',
            description: 'Investigate issues, analyze logs, diagnose and fix problems',
            category: 'development',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        const teamCtx = getTeamContext();

        logger.agent(this.name, `Debugging: ${ctx.currentTask}`);

        try {
            // Get context from team (especially from tester)
            let testFailures = '';
            let testOutput = '';
            let relevantFiles: string[] = [];

            if (teamCtx) {
                // Check for request from tester
                const messages = teamCtx.getMessages(this.name);
                const testerRequest = messages.find(m => m.from === 'tester' && m.type === 'request');

                if (testerRequest) {
                    logger.info(`📨 Received from Tester: ${testerRequest.content}`);

                    const data = testerRequest.data as {
                        failures?: Array<{ test: string; error: string }>;
                        testOutput?: string;
                    } | undefined;

                    if (data?.failures) {
                        testFailures = data.failures.map(f => `- ${f.test}: ${f.error}`).join('\n');
                    }
                    if (data?.testOutput) {
                        testOutput = data.testOutput;
                    }
                }

                // Get relevant files from scout
                relevantFiles = teamCtx.getFullContext().knowledge.codebaseInfo.relevantFiles;
            }

            const prompt = `You are an expert debugger. Analyze the following issue and provide solutions:

## Issue
${ctx.currentTask}

${testFailures ? `## Test Failures\n${testFailures}` : ''}

${testOutput ? `## Test Output\n${testOutput}` : ''}

${ctx.sharedData.logs ? `## Logs\n${ctx.sharedData.logs}` : ''}
${ctx.sharedData.stackTrace ? `## Stack Trace\n${ctx.sharedData.stackTrace}` : ''}
${ctx.sharedData.code ? `## Relevant Code\n${ctx.sharedData.code}` : ''}

${relevantFiles.length > 0 ? `## Relevant Files\n${relevantFiles.slice(0, 10).join('\n')}` : ''}

Please provide:
1. **Root Cause Analysis** - What's causing the issue
2. **Impact Assessment** - What's affected
3. **Step-by-Step Fix** - Exact code changes needed
4. **Verification Steps** - How to confirm the fix works
5. **Prevention** - How to avoid this in the future

Be specific with file names, line numbers, and exact code changes.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Debug analysis complete');

            // Report to team
            if (teamCtx) {
                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    '🔧 Debug analysis complete. Fix recommendations provided.',
                    { hasAnalysis: true }
                );

                // Add analysis as artifact
                teamCtx.addArtifact('debug-analysis', {
                    name: 'debug-analysis',
                    type: 'analysis',
                    createdBy: this.name,
                    content: result.content,
                });

                teamCtx.addFinding('debugAnalysis', {
                    analysis: result.content,
                    timestamp: new Date().toISOString(),
                });

                // Handoff back to tester to verify fix
                teamCtx.sendMessage(
                    this.name,
                    'tester',
                    'handoff',
                    'I have analyzed the issue and provided fix recommendations. Please re-run tests after applying fixes.',
                    { fixProvided: true }
                );
            }

            return this.createOutput(
                true,
                'Debug analysis complete. Apply recommended fixes and re-test.',
                {
                    analysis: result.content,
                    tokensUsed: result.usage,
                    nextStep: 'Apply fixes, then run tester again',
                },
                [],
                'tester' // Suggest re-testing after fix
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Debugging failed: ${message}`);

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Debug analysis failed: ${message}`);
            }

            return this.createOutput(false, `Debugging failed: ${message}`, {
                error: message,
            });
        }
    }
}

export const debuggerAgent = new DebuggerAgent();
