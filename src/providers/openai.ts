/**
 * OpenAI Provider
 * OpenAI GPT integration
 */

import OpenAI from 'openai';
import {
    BaseProvider,
    Message,
    GenerateOptions,
    GenerateResult,
    StreamChunk,
} from './base-provider.js';

export class OpenAIProvider extends BaseProvider {
    private client: OpenAI;

    constructor(apiKey: string, model: string = 'gpt-4o') {
        super(apiKey, model);
        this.client = new OpenAI({ apiKey });
    }

    get providerName(): string {
        return 'openai';
    }

    async generate(
        messages: Message[],
        options?: GenerateOptions
    ): Promise<GenerateResult> {
        // Convert to OpenAI format
        const chatMessages = messages.map((m) => ({
            role: m.role,
            content: m.content,
        }));

        // Add system prompt if provided
        if (options?.systemPrompt) {
            chatMessages.unshift({
                role: 'system',
                content: options.systemPrompt,
            });
        }

        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: chatMessages,
            temperature: options?.temperature,
            max_tokens: options?.maxTokens,
            stop: options?.stopSequences,
        });

        const content = response.choices[0]?.message?.content ?? '';

        return {
            content,
            model: this.model,
            provider: this.providerName,
            usage: {
                inputTokens: response.usage?.prompt_tokens ?? 0,
                outputTokens: response.usage?.completion_tokens ?? 0,
            },
        };
    }

    async *generateStream(
        messages: Message[],
        options?: GenerateOptions
    ): AsyncGenerator<StreamChunk> {
        const chatMessages = messages.map((m) => ({
            role: m.role,
            content: m.content,
        }));

        if (options?.systemPrompt) {
            chatMessages.unshift({
                role: 'system',
                content: options.systemPrompt,
            });
        }

        const stream = await this.client.chat.completions.create({
            model: this.model,
            messages: chatMessages,
            temperature: options?.temperature,
            max_tokens: options?.maxTokens,
            stop: options?.stopSequences,
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? '';
            if (content) {
                yield { content, done: false };
            }
        }

        yield { content: '', done: true };
    }
}
