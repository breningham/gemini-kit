/**
 * Plan Command
 * Invokes planner + researcher agents
 */

import chalk from 'chalk';
import ora from 'ora';
import { plannerAgent } from '../agents/development/planner.js';
import { researcherAgent } from '../agents/research/researcher.js';

export async function planCommand(feature: string): Promise<void> {
    console.log(chalk.cyan.bold('\n📋 Planning...\n'));
    console.log(chalk.gray(`Feature: ${feature}\n`));

    const ctx = {
        projectRoot: process.cwd(),
        currentTask: feature,
        sharedData: {},
    };

    // Research first
    const spinner = ora('Researching best practices...').start();
    try {
        researcherAgent.initialize(ctx);
        const research = await researcherAgent.execute();
        researcherAgent.cleanup();

        if (research.success) {
            spinner.succeed('Research complete');
            ctx.sharedData = { research: research.data };
        }
    } catch (error) {
        spinner.warn(`Research skipped: ${error}`);
    }

    // Then plan
    spinner.start('Creating implementation plan...');
    try {
        plannerAgent.initialize(ctx);
        const plan = await plannerAgent.execute();
        plannerAgent.cleanup();

        if (plan.success) {
            spinner.succeed('Plan created');
            console.log(chalk.green(`\n📁 Plan saved to: ${plan.data.planPath}`));
        } else {
            spinner.fail(plan.message);
        }
    } catch (error) {
        spinner.fail(`Planning failed: ${error}`);
    }
}
