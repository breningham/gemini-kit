/**
 * Docs Commands
 * Invokes docs-manager agent
 */

import chalk from 'chalk';
import ora from 'ora';
import { docsManagerAgent } from '../agents/documentation/docs-manager.js';
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { providerManager } from '../providers/index.js';

export async function docsInitCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n📚 Initializing Documentation...\n'));
    const docsDir = join(process.cwd(), 'docs');
    if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });

    const files = [
        { name: 'README.md', content: '# Documentation\n\n## Overview\n\n## Getting Started\n\n## Architecture\n\n## API Reference\n' },
        { name: 'code-standards.md', content: '# Code Standards\n\n## Naming\n- camelCase for variables\n- PascalCase for types\n\n## Best Practices\n- Write tests\n- Document APIs\n' },
    ];

    for (const file of files) {
        const path = join(docsDir, file.name);
        if (!existsSync(path)) { writeFileSync(path, file.content); console.log(chalk.green(`  ✓ Created ${file.name}`)); }
        else { console.log(chalk.gray(`  ⊘ ${file.name} exists`)); }
    }
    console.log(chalk.green.bold('\n✅ Documentation initialized!\n'));
}

export async function docsUpdateCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n📝 Updating Documentation...\n'));
    const ctx = { projectRoot: process.cwd(), currentTask: 'update documentation', sharedData: {} };
    const spinner = ora('Updating...').start();
    try {
        docsManagerAgent.initialize(ctx);
        const result = await docsManagerAgent.execute();
        docsManagerAgent.cleanup();
        if (result.success) { spinner.succeed('Updated'); } else { spinner.fail(result.message); }
    } catch (e) { spinner.fail(`Failed: ${e}`); }
}

export async function docsSummarizeCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n📄 Summarizing Documentation...\n'));
    const spinner = ora('Reading docs...').start();
    try {
        const docsDir = join(process.cwd(), 'docs');
        let docsContent = '';

        if (existsSync(docsDir)) {
            const files = readdirSync(docsDir).filter(f => f.endsWith('.md'));
            for (const file of files.slice(0, 5)) {
                const content = readFileSync(join(docsDir, file), 'utf-8');
                docsContent += `\n## ${file}\n${content.slice(0, 1000)}\n`;
            }
        }

        spinner.text = 'Summarizing...';
        const prompt = `Summarize this project documentation concisely:
${docsContent || 'No docs found'}

Provide:
1. **Project Overview** - What it does
2. **Key Features** - Main capabilities
3. **Architecture** - High-level structure
4. **Getting Started** - Quick start steps`;

        const result = await providerManager.generate([{ role: 'user', content: prompt }]);
        spinner.succeed('Summary created');
        console.log(result.content);
    } catch (e) { spinner.fail(`Failed: ${e}`); }
}

