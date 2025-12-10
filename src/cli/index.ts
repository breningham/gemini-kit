/**
 * Gemini-Kit CLI Entry Point
 * ClaudeKit-style AI Development Assistant
 */

import { Command } from 'commander';
import chalk from 'chalk';

// Commands
import { cookCommand } from '../commands/cook.js';
import { planCommand } from '../commands/plan.js';
import { scoutCommand } from '../commands/scout.js';
import { initCommand } from '../commands/init.js';
import { testCommand } from '../commands/test.js';
import { debugCommand } from '../commands/debug.js';
import { gitCommitCommand, gitCommitPushCommand } from '../commands/git.js';
import { docsInitCommand, docsUpdateCommand } from '../commands/docs.js';
import { designFastCommand, designGoodCommand } from '../commands/design.js';
import { brainstormCommand } from '../commands/brainstorm.js';
import { journalCommand } from '../commands/journal.js';
import { watzupCommand } from '../commands/watzup.js';
import { contentGoodCommand, contentCroCommand } from '../commands/content.js';
import { researchDeepCommand, researchQuickCommand } from '../commands/research.js';

const program = new Command();

program
    .name('gk')
    .description('Gemini-Kit: ClaudeKit-style AI Development Assistant')
    .version('0.1.0');

// Core workflow commands
program
    .command('cook <task>')
    .description('All-in-one development workflow (planner → scout → code → test → review → docs → git)')
    .action(cookCommand);

program
    .command('plan <feature>')
    .description('Create implementation plan (invokes: planner + researcher)')
    .action(planCommand);

program
    .command('scout <query>')
    .description('Search codebase for relevant files')
    .action(scoutCommand);

program
    .command('init')
    .description('Initialize gemini-kit in current project')
    .action(initCommand);

program
    .command('test')
    .description('Run tests (invokes: tester agent)')
    .action(testCommand);

program
    .command('debug <issue>')
    .description('Debug an issue (invokes: debugger agent)')
    .action(debugCommand);

// Fix commands
const fix = program.command('fix').description('Fix issues');

fix
    .command('fast')
    .description('Quick fixes (linting, formatting)')
    .action(async () => {
        console.log(chalk.cyan('⚡ /fix:fast'));
        console.log(chalk.gray('Running linter and formatter...'));
    });

fix
    .command('hard <issue>')
    .description('Complex investigation and fix')
    .action(async (issue: string) => {
        await debugCommand(issue);
    });

fix
    .command('types')
    .description('Fix TypeScript errors')
    .action(async () => {
        console.log(chalk.cyan('📝 /fix:types'));
        console.log(chalk.gray('Running TypeScript compiler...'));
    });

// Git commands
const git = program.command('git').description('Git operations (invokes: git-manager agent)');

git
    .command('cm')
    .description('Stage and commit with AI-generated message')
    .action(gitCommitCommand);

git
    .command('cp')
    .description('Commit and push')
    .action(gitCommitPushCommand);

git
    .command('pr <branch>')
    .description('Create pull request')
    .action(async (branch: string) => {
        console.log(chalk.cyan('🔀 /git:pr'), branch);
        console.log(chalk.gray('TODO: Implement PR creation'));
    });

// Docs commands
const docs = program.command('docs').description('Documentation (invokes: docs-manager agent)');

docs
    .command('init')
    .description('Initialize documentation structure')
    .action(docsInitCommand);

docs
    .command('update')
    .description('Update documentation')
    .action(docsUpdateCommand);

// Design commands
const design = program.command('design').description('Design operations (invokes: ui-ux-designer agent)');

design
    .command('fast <description>')
    .description('Quick UI mockups')
    .action(designFastCommand);

design
    .command('good <description>')
    .description('Premium designs with full spec')
    .action(designGoodCommand);

// Content commands
const content = program.command('content').description('Content creation (invokes: copywriter agent)');

content
    .command('good <description>')
    .description('Create high-quality content')
    .action(contentGoodCommand);

content
    .command('cro <description>')
    .description('Create CRO-optimized conversion content')
    .action(contentCroCommand);

// Research commands
const research = program.command('research').description('Technical research (invokes: researcher agent)');

research
    .command('deep <topic>')
    .description('Deep multi-phase research with saved output')
    .action(researchDeepCommand);

research
    .command('quick <topic>')
    .description('Quick research overview')
    .action(researchQuickCommand);

// Brainstorm command
program
    .command('brainstorm <topic>')
    .description('Explore ideas (invokes: brainstormer agent)')
    .action(brainstormCommand);

// Journal command
program
    .command('journal')
    .description('Write development journal (invokes: journal-writer agent)')
    .action(journalCommand);

// Watzup command (status)
program
    .command('watzup')
    .description('Project status overview (invokes: project-manager agent)')
    .action(watzupCommand);

// Show banner
console.log(chalk.bold.cyan(`
╔═══════════════════════════════════════════╗
║           Gemini-Kit v0.1.0               ║
║   ClaudeKit-style AI Development Tool     ║
╚═══════════════════════════════════════════╝
`));

program.parse();

