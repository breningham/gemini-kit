/**
 * Design Commands
 * Invokes ui-ux-designer agent
 */

import chalk from 'chalk';
import ora from 'ora';
import { uiUxDesignerAgent } from '../agents/creative/ui-ux-designer.js';
import { providerManager } from '../providers/index.js';

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

export async function design3dCommand(description: string): Promise<void> {
    console.log(chalk.cyan.bold('\n🎮 Three.js 3D Scene Design...\n'));
    console.log(chalk.gray(`Description: ${description}\n`));

    const spinner = ora('Creating 3D scene...').start();

    try {
        const prompt = `You are a Three.js expert. Create a complete 3D scene for:

Description: ${description}

Provide:
1. **Scene Setup** - Camera, lighting, renderer config
2. **Geometry** - 3D objects with materials
3. **Animations** - RequestAnimationFrame loop
4. **Interactivity** - Mouse/touch controls
5. **Complete Code** - Full working Three.js code

Include:
- OrbitControls for camera rotation
- Responsive canvas sizing
- Proper lighting setup
- Clean, commented code

Provide the complete HTML file with embedded Three.js.`;

        const result = await providerManager.generate([
            { role: 'user', content: prompt },
        ]);

        spinner.succeed('3D scene created');
        console.log(chalk.white('\n🎮 Three.js Scene:\n'));
        console.log(result.content);
    } catch (error) {
        spinner.fail(`3D design failed: ${error}`);
    }
}
