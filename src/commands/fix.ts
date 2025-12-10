/**
 * Fix Commands
 * Smart router for various fix operations
 */

import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { debuggerAgent } from '../agents/development/debugger.js';
import { testerAgent } from '../agents/quality/tester.js';

export async function fixFastCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n⚡ Quick Fix...\n'));

    const spinner = ora('Running linter and formatter...').start();

    try {
        // Try common lint/format commands
        const commands = [
            { name: 'ESLint', cmd: 'npx eslint src --fix --quiet' },
            { name: 'Prettier', cmd: 'npx prettier --write "src/**/*.ts" --log-level error' },
        ];

        for (const { name, cmd } of commands) {
            try {
                execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
                spinner.text = `${name} ✓`;
            } catch {
                // Continue even if one fails
            }
        }

        spinner.succeed('Quick fix complete');
    } catch (error) {
        spinner.fail(`Fix failed: ${error}`);
    }
}

export async function fixHardCommand(issue: string): Promise<void> {
    console.log(chalk.cyan.bold('\n🔧 Hard Fix...\n'));
    console.log(chalk.gray(`Issue: ${issue}\n`));

    const ctx = {
        projectRoot: process.cwd(),
        currentTask: issue,
        sharedData: {},
    };

    const spinner = ora('Step 1/3: Analyzing issue...').start();

    try {
        // Step 1: Debug
        debuggerAgent.initialize(ctx);
        const debugResult = await debuggerAgent.execute();
        debuggerAgent.cleanup();
        spinner.succeed('Analysis complete');

        if (debugResult.success) {
            console.log(chalk.gray('\n📋 Analysis saved. Apply fixes manually.\n'));
        }

        // Step 2: Run tests
        spinner.start('Step 2/3: Running tests...');
        testerAgent.initialize(ctx);
        const testResult = await testerAgent.execute();
        testerAgent.cleanup();

        if (testResult.success) {
            spinner.succeed('Tests passing');
        } else {
            spinner.warn('Some tests failing');
        }

        spinner.info('Step 3/3: Review and commit manually');
    } catch (error) {
        spinner.fail(`Fix failed: ${error}`);
    }
}

export async function fixTypesCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n📝 Fixing TypeScript Errors...\n'));

    const spinner = ora('Running TypeScript compiler...').start();

    try {
        try {
            execSync('npx tsc --noEmit', { encoding: 'utf-8', stdio: 'pipe' });
            spinner.succeed('No TypeScript errors');
        } catch (error) {
            const output = error instanceof Error ? (error as { stdout?: string }).stdout ?? '' : '';
            spinner.fail('TypeScript errors found');
            console.log(chalk.red('\n' + output));
        }
    } catch (error) {
        spinner.fail(`Type check failed: ${error}`);
    }
}

export async function fixTestCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n🧪 Fixing Failing Tests...\n'));

    const ctx = {
        projectRoot: process.cwd(),
        currentTask: 'fix failing tests',
        sharedData: {},
    };

    const spinner = ora('Running tests...').start();

    try {
        testerAgent.initialize(ctx);
        const result = await testerAgent.execute();
        testerAgent.cleanup();

        if (result.success) {
            spinner.succeed('All tests passing');
        } else {
            spinner.warn('Tests still failing - review manually');
        }
    } catch (error) {
        spinner.fail(`Test fix failed: ${error}`);
    }
}
