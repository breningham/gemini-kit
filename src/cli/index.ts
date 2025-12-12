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
import { designFastCommand, designGoodCommand, design3dCommand } from '../commands/design.js';
import { brainstormCommand } from '../commands/brainstorm.js';
import { journalCommand } from '../commands/journal.js';
import { watzupCommand } from '../commands/watzup.js';
import { contentGoodCommand, contentCroCommand } from '../commands/content.js';
import { researchDeepCommand, researchQuickCommand } from '../commands/research.js';
import { fixFastCommand, fixHardCommand, fixTypesCommand, fixTestCommand, fixUiCommand, fixCiCommand, fixLogsCommand } from '../commands/fix.js';
import { bootstrapCommand } from '../commands/bootstrap.js';
import { codeCommand } from '../commands/code.js';
import { codeReviewCommand } from '../commands/code-review.js';
import { dbQueryCommand, dbOptimizeCommand, dbSchemaCommand } from '../commands/db.js';

const program = new Command();

program
    .name('gk')
    .description('Gemini-Kit: ClaudeKit-style AI Development Assistant')
    .version('0.1.0');

// Core workflow commands
program.command('cook <task>').description('All-in-one workflow (planner → coder → tester → reviewer → git)').action(cookCommand);
program.command('bootstrap <project-name>').description('Generate new project').option('-t, --template <template>', 'Template').action((n, o) => bootstrapCommand(n, o.template));
program.command('plan <feature>').description('Create implementation plan').action(planCommand);
program.command('code <plan-path>').description('Generate code from plan (e.g., gk code @plans/feature.md)').action(codeCommand);
program.command('code-review [file]').description('Code review (invokes: code-reviewer agent)').action(codeReviewCommand);
program.command('scout <query>').description('Search codebase').action(scoutCommand);
program.command('init').description('Initialize gemini-kit').action(initCommand);
program.command('test').description('Run tests').action(testCommand);
program.command('debug <issue>').description('Debug an issue').action(debugCommand);

// Fix commands (7)
const fix = program.command('fix').description('Fix issues');
fix.command('fast').description('Quick fixes (lint/format)').action(fixFastCommand);
fix.command('hard <issue>').description('Complex investigation').action(fixHardCommand);
fix.command('types').description('TypeScript errors').action(fixTypesCommand);
fix.command('test').description('Failing tests').action(fixTestCommand);
fix.command('ui <component>').description('UI issues').action(fixUiCommand);
fix.command('ci').description('CI/CD issues').action(fixCiCommand);
fix.command('logs [file]').description('Log analysis').action(fixLogsCommand);

// Git commands (3)
const git = program.command('git').description('Git operations');
git.command('cm').description('Commit with AI message').action(gitCommitCommand);
git.command('cp').description('Commit and push').action(gitCommitPushCommand);
git.command('pr <branch>').description('Create PR').action(async (b: string) => console.log(chalk.cyan('🔀 git:pr'), b));

// Docs commands (2)
const docs = program.command('docs').description('Documentation');
docs.command('init').description('Initialize docs').action(docsInitCommand);
docs.command('update').description('Update docs').action(docsUpdateCommand);

// Design commands (3)
const design = program.command('design').description('Design operations');
design.command('fast <description>').description('Quick mockups').action(designFastCommand);
design.command('good <description>').description('Premium designs').action(designGoodCommand);
design.command('3d <description>').description('Three.js scenes').action(design3dCommand);

// Content commands (2)
const content = program.command('content').description('Content creation');
content.command('good <description>').description('Quality content').action(contentGoodCommand);
content.command('cro <description>').description('CRO copy').action(contentCroCommand);

// Research commands (2)
const research = program.command('research').description('Technical research');
research.command('deep <topic>').description('Deep research').action(researchDeepCommand);
research.command('quick <topic>').description('Quick overview').action(researchQuickCommand);

// Database commands (3)
const db = program.command('db').description('Database operations (invokes: database-admin agent)');
db.command('query <sql>').description('Analyze SQL query').action(dbQueryCommand);
db.command('optimize').description('Database optimization').action(dbOptimizeCommand);
db.command('schema').description('Schema analysis').action(dbSchemaCommand);

// Other commands
program.command('brainstorm <topic>').description('Explore ideas').action(brainstormCommand);
program.command('journal').description('Dev journal').action(journalCommand);
program.command('watzup').description('Project status').action(watzupCommand);

// Banner
console.log(chalk.bold.cyan(`
╔═══════════════════════════════════════════╗
║           Gemini-Kit v0.1.0               ║
║   ClaudeKit-style AI Development Tool     ║
╚═══════════════════════════════════════════╝
`));

program.parse();
