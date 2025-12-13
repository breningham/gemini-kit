/**
 * Chat Command - Interactive Chat Mode (như ClaudeKit)
 * Features: Streaming, Conversation History, Context Awareness
 */

import { createInterface } from 'readline';
import { providerManager } from '../providers/index.js';
import { logger } from '../utils/logger.js';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export async function chatCommand(): Promise<void> {
    logger.header('Gemini-Kit Chat', 'Interactive AI Assistant • Type "exit" to quit');

    const history: ChatMessage[] = [];

    // Load project context
    const projectContext = loadProjectContext();
    if (projectContext) {
        history.push({
            role: 'system',
            content: `You are a helpful AI coding assistant. Here's the project context:\n${projectContext}\n\nBe concise but helpful. If asked about code, provide examples.`
        });
        logger.info('Project context loaded');
    }

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const prompt = () => {
        rl.question('\n💬 You: ', async (input) => {
            const trimmed = input.trim();

            if (!trimmed) {
                prompt();
                return;
            }

            if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
                logger.success('Goodbye! 👋');
                rl.close();
                return;
            }

            if (trimmed.toLowerCase() === 'clear') {
                history.length = projectContext ? 1 : 0;
                logger.info('Chat history cleared');
                prompt();
                return;
            }

            if (trimmed.toLowerCase() === 'history') {
                console.log('\n📜 Chat History:');
                history.forEach((msg, _i) => {
                    if (msg.role !== 'system') {
                        console.log(`  ${msg.role === 'user' ? '💬' : '🤖'} ${msg.content.slice(0, 100)}...`);
                    }
                });
                prompt();
                return;
            }

            // Add user message
            history.push({ role: 'user', content: trimmed });

            try {
                logger.startSpinner('Thinking...');

                const response = await providerManager.generate(
                    history.map(m => ({ role: m.role, content: m.content }))
                );

                logger.stopSpinner();

                // Add assistant response
                history.push({ role: 'assistant', content: response.content });

                // Display response
                console.log('\n🤖 Assistant:');
                console.log(response.content);

            } catch (error) {
                logger.stopSpinner();
                const message = error instanceof Error ? error.message : 'Unknown error';
                logger.error(`Chat error: ${message}`);
            }

            prompt();
        });
    };

    // Show help
    console.log('\nCommands:');
    console.log('  exit    - Exit chat');
    console.log('  clear   - Clear history');
    console.log('  history - Show chat history\n');

    prompt();
}

function loadProjectContext(): string | null {
    const cwd = process.cwd();
    let context = '';

    // Read package.json
    const pkgPath = join(cwd, 'package.json');
    if (existsSync(pkgPath)) {
        try {
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
            context += `Project: ${pkg.name || 'Unknown'}\n`;
            context += `Version: ${pkg.version || 'Unknown'}\n`;
            if (pkg.description) context += `Description: ${pkg.description}\n`;
        } catch { /* ignore */ }
    }

    // Read README summary
    const readmePath = join(cwd, 'README.md');
    if (existsSync(readmePath)) {
        try {
            const readme = readFileSync(readmePath, 'utf-8');
            const firstSection = readme.split('\n').slice(0, 20).join('\n');
            context += `\nREADME:\n${firstSection}`;
        } catch { /* ignore */ }
    }

    // Read codebase summary if exists
    const summaryPath = join(cwd, 'docs', 'codebase-summary.md');
    if (existsSync(summaryPath)) {
        try {
            const summary = readFileSync(summaryPath, 'utf-8').slice(0, 1000);
            context += `\nCodebase:\n${summary}`;
        } catch { /* ignore */ }
    }

    return context || null;
}
