/**
 * Design Commands
 * Invokes ui-ux-designer agent
 */

import chalk from 'chalk';
import ora from 'ora';
import { uiUxDesignerAgent } from '../agents/creative/ui-ux-designer.js';

export async function designFastCommand(description: string): Promise<void> {
    console.log(chalk.cyan.bold('\n🎨 Quick Design...\n'));
    console.log(chalk.gray(`Description: ${description}\n`));

    const ctx = {
        projectRoot: process.cwd(),
        currentTask: `quick design: ${description}`,
        sharedData: {},
    };

    const spinner = ora('Creating design...').start();

    try {
        uiUxDesignerAgent.initialize(ctx);
        const result = await uiUxDesignerAgent.execute();
        uiUxDesignerAgent.cleanup();

        if (result.success) {
            spinner.succeed('Design created');
            console.log(chalk.white('\n📐 Design Specification:\n'));
            console.log(result.data.design);
        } else {
            spinner.fail(result.message);
        }
    } catch (error) {
        spinner.fail(`Design failed: ${error}`);
    }
}

export async function designGoodCommand(description: string): Promise<void> {
    console.log(chalk.cyan.bold('\n✨ Premium Design...\n'));
    console.log(chalk.gray(`Description: ${description}\n`));

    const ctx = {
        projectRoot: process.cwd(),
        currentTask: `premium design with full spec: ${description}`,
        sharedData: {},
    };

    const spinner = ora('Creating premium design...').start();

    try {
        uiUxDesignerAgent.initialize(ctx);
        const result = await uiUxDesignerAgent.execute();
        uiUxDesignerAgent.cleanup();

        if (result.success) {
            spinner.succeed('Premium design created');
            console.log(chalk.white('\n📐 Design Specification:\n'));
            console.log(result.data.design);
        } else {
            spinner.fail(result.message);
        }
    } catch (error) {
        spinner.fail(`Design failed: ${error}`);
    }
}
