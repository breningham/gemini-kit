/**
 * Tester Agent
 * Validate code quality through comprehensive testing
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
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
        logger.agent(this.name, 'Running tests...');

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
                logger.success(`Tests passed with: ${cmd}`);
                break;
            } catch (error) {
                const output = error instanceof Error ? error.message : 'Unknown error';
                results.push({ command: cmd, success: false, output });
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

        // No tests found or all failed
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
