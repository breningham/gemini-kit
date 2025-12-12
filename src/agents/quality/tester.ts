/**
 * Tester Agent
 * Validate code quality through comprehensive testing
 * Acts as the QA Engineer of the team
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
import { execSync } from 'child_process';
import { logger } from '../../utils/logger.js';

export class TesterAgent extends BaseAgent {
    constructor() {
        super({
            name: 'tester',
            description: 'Validate code quality through comprehensive testing',
            category: 'quality',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        const teamCtx = getTeamContext();

        logger.agent(this.name, 'Running tests...');

        // Check what the team has done so far
        if (teamCtx) {
            const progress = teamCtx.getFullContext().knowledge.taskProgress;
            if (!progress.planned) {
                logger.warn('⚠️ No plan created yet. Consider running planner first.');
            }

            // Check for relevant files from scout
            const files = teamCtx.getFullContext().knowledge.codebaseInfo.relevantFiles;
            if (files.length > 0) {
                logger.info(`📁 Testing context: ${files.length} relevant files identified by scout`);
            }
        }

        const results: {
            command: string;
            success: boolean;
            output: string;
        }[] = [];

        // Try common test commands
        const testCommands = [
            'pnpm test --run',
            'npm test -- --run',
            'yarn test --run',
            'vitest run',
            'jest --passWithNoTests',
        ];

        let testSuccess = false;
        let testOutput = '';

        for (const cmd of testCommands) {
            try {
                const output = execSync(cmd, {
                    cwd: ctx.projectRoot,
                    encoding: 'utf-8',
                    timeout: 60000,
                    stdio: ['pipe', 'pipe', 'pipe'],
                });

                results.push({ command: cmd, success: true, output });
                testSuccess = true;
                testOutput = output;
                logger.success(`Tests passed with: ${cmd}`);
                break;
            } catch (error) {
                const output = error instanceof Error ? error.message : 'Unknown error';
                results.push({ command: cmd, success: false, output });
                testOutput = output;
            }
        }

        // Report to team
        if (teamCtx) {
            if (testSuccess) {
                teamCtx.updateProgress('tested', true);

                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    `✅ All tests passed!`,
                    { testsPassed: true, output: testOutput.slice(0, 500) }
                );

                teamCtx.sendMessage(
                    this.name,
                    'code-reviewer',
                    'handoff',
                    'Tests passed. Please review the code quality.',
                    { testsVerified: true }
                );

                teamCtx.addFinding('testResults', { passed: true, output: testOutput });
            } else {
                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'info',
                    `⚠️ Tests failed or no test runner found`,
                    { testsFailed: true, output: testOutput.slice(0, 500) }
                );

                teamCtx.addFinding('testResults', { passed: false, output: testOutput });
            }
        }

        if (testSuccess) {
            return this.createOutput(
                true,
                'All tests passed',
                { results },
                [],
                'code-reviewer'
            );
        }

        logger.warn('No test runner found or tests failed');

        return this.createOutput(
            false,
            'Tests failed or no test runner found',
            { results },
            []
        );
    }
}

export const testerAgent = new TesterAgent();
