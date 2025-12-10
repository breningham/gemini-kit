/**
 * Docs Commands
 * Invokes docs-manager agent
 */

import chalk from 'chalk';
import ora from 'ora';
import { docsManagerAgent } from '../agents/documentation/docs-manager.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function docsInitCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n📚 Initializing Documentation...\n'));

    const projectRoot = process.cwd();
    const docsDir = join(projectRoot, 'docs');

    if (!existsSync(docsDir)) {
        mkdirSync(docsDir, { recursive: true });
    }

    // Create standard docs files
    const files = [
        {
            name: 'README.md',
            content: `# Documentation

## Overview

[Project description here]

## Getting Started

[Installation instructions]

## Architecture

[Architecture overview]

## API Reference

[API documentation]
`,
        },
        {
            name: 'code-standards.md',
            content: `# Code Standards

## Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes and types
- Use SCREAMING_SNAKE_CASE for constants

## File Structure

- One component per file
- Group related files in directories
- Use index.ts for exports

## Best Practices

- Write tests for all features
- Document public APIs
- Keep functions small and focused
`,
        },
    ];

    for (const file of files) {
        const path = join(docsDir, file.name);
        if (!existsSync(path)) {
            writeFileSync(path, file.content);
            console.log(chalk.green(`  ✓ Created ${file.name}`));
        } else {
            console.log(chalk.gray(`  ⊘ ${file.name} already exists`));
        }
    }

    console.log(chalk.green.bold('\n✅ Documentation initialized!\n'));
}

export async function docsUpdateCommand(): Promise<void> {
    console.log(chalk.cyan.bold('\n📝 Updating Documentation...\n'));

    const ctx = {
        projectRoot: process.cwd(),
        currentTask: 'update documentation',
        sharedData: {},
    };

    const spinner = ora('Updating docs...').start();

    try {
        docsManagerAgent.initialize(ctx);
        const result = await docsManagerAgent.execute();
        docsManagerAgent.cleanup();

        if (result.success) {
            spinner.succeed('Documentation updated');
        } else {
            spinner.fail(result.message);
        }
    } catch (error) {
        spinner.fail(`Update failed: ${error}`);
    }
}
