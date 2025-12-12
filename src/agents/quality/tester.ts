/**
 * Tester Agent
 * Validate code quality through comprehensive testing
 * Acts as the QA Engineer - reports issues back to team
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
import { execSync } from 'child_process';
import { logger } from '../../utils/logger.js';

export interface TestFailure {
    test: string;
    error: string;
    file?: string;
    line?: number;
}

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

        // Check team context
        if (teamCtx) {
            const progress = teamCtx.getFullContext().knowledge.taskProgress;
            if (!progress.planned) {
                logger.warn('⚠️ No plan created yet. Consider running planner first.');
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
        let failures: TestFailure[] = [];

        for (const cmd of testCommands) {
            try {
                const output = execSync(cmd, {
                    cwd: ctx.projectRoot,
                    encoding: 'utf-8',
                    timeout: 120000,
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

                // Parse failures from output
                failures = this.parseTestFailures(output);
            }
        }

        // Report to team
        if (teamCtx) {
            if (testSuccess) {
                // ✅ Tests passed - continue workflow
                teamCtx.updateProgress('tested', true);

                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'result',
                    `✅ All tests passed!`,
                    { testsPassed: true }
                );

                teamCtx.sendMessage(
                    this.name,
                    'code-reviewer',
                    'handoff',
                    'Tests passed. Please review the code quality.',
                    { testsVerified: true }
                );

                teamCtx.addFinding('testResults', { passed: true, output: testOutput });

                return this.createOutput(
                    true,
                    'All tests passed',
                    { results },
                    [],
                    'code-reviewer'
                );
            } else {
                // ❌ Tests failed - handoff to debugger
                logger.error('❌ Tests failed! Requesting debugger assistance...');

                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'info',
                    `❌ Tests failed! Found ${failures.length} issue(s)`,
                    { testsFailed: true, failureCount: failures.length }
                );

                // Send failures to debugger
                teamCtx.sendMessage(
                    this.name,
                    'debugger',
                    'request',
                    'Tests failed. Please investigate and fix these issues.',
                    {
                        failures,
                        testOutput: testOutput.slice(0, 2000),
                        needsDebug: true
                    }
                );

                teamCtx.addFinding('testResults', {
                    passed: false,
                    failures,
                    output: testOutput
                });

                return this.createOutput(
                    false,
                    `Tests failed with ${failures.length} issue(s). Debugger requested.`,
                    { results, failures, needsDebug: true },
                    [],
                    'debugger' // Handoff to debugger instead of code-reviewer
                );
            }
        }

        // No team context - basic response
        if (testSuccess) {
            return this.createOutput(true, 'All tests passed', { results }, [], 'code-reviewer');
        }

        return this.createOutput(false, 'Tests failed', { results, failures }, []);
    }

    /**
     * Parse test output to extract failures
     */
    private parseTestFailures(output: string): TestFailure[] {
        const failures: TestFailure[] = [];

        // Parse common patterns
        const patterns = [
            // Vitest/Jest pattern: FAIL tests/file.test.ts > test name
            /FAIL\s+(.+?)\s+>\s+(.+)/g,
            // Error pattern
            /Error:\s+(.+)/g,
            // AssertionError pattern
            /AssertionError:\s+(.+)/g,
        ];

        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(output)) !== null) {
                failures.push({
                    test: match[1] || 'Unknown test',
                    error: match[2] || match[1] || 'Unknown error',
                });
            }
        }

        // If no specific failures found, create generic one
        if (failures.length === 0 && output.includes('FAIL')) {
            failures.push({
                test: 'Unknown',
                error: 'Test suite failed - check output for details',
            });
        }

        return failures;
    }
}

export const testerAgent = new TesterAgent();
