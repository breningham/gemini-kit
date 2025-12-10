/**
 * Claude Provider
 * Anthropic Claude AI integration
 */

import Anthropic from '@anthropic-ai/sdk';
import {
    BaseProvider,
    Message,
    GenerateOptions,
    GenerateResult,
    StreamChunk,
} from './base-provider.js';

export class ClaudeProvider extends BaseProvider {
    private client: Anthropic;

    constructor(apiKey: string, model: string = 'claude-3-5-sonnet-20241022') {
        super(apiKey, model);
        this.client = new Anthropic({ apiKey });
    }

    get providerName(): string {
        return 'claude';
    }

    async generate(
        messages: Message[],
        options?: GenerateOptions
    ): Promise<GenerateResult> {
        // Extract system message if present
        const systemMessage = messages.find((m) => m.role === 'system');
        const chatMessages = messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            }));

        const response = await this.client.messages.create({
            model: this.model,
            max_tokens: options?.maxTokens ?? 4096,
            system: options?.systemPrompt ?? systemMessage?.content,
            messages: chatMessages,
            temperature: options?.temperature,
            stop_sequences: options?.stopSequences,
        });

        const textContent = response.content.find((c) => c.type === 'text');
        const text = textContent && 'text' in textContent ? textContent.text : '';

        return {
            content: text,
            model: this.model,
            provider: this.providerName,
            usage: {
                inputTokens: response.usage.input_tokens,
                outputTokens: response.usage.output_tokens,
            },
        };
    }

    async *generateStream(
        messages: Message[],
        options?: GenerateOptions
    ): AsyncGenerator<StreamChunk> {
        const systemMessage = messages.find((m) => m.role === 'system');
        const chatMessages = messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            }));

        const stream = this.client.messages.stream({
            model: this.model,
            max_tokens: options?.maxTokens ?? 4096,
            system: options?.systemPrompt ?? systemMessage?.content,
            messages: chatMessages,
            temperature: options?.temperature,
            stop_sequences: options?.stopSequences,
        });

        for await (const event of stream) {
            if (
                event.type === 'content_block_delta' &&
                event.delta.type === 'text_delta'
            ) {
                yield { content: event.delta.text, done: false };
            }
        }

        yield { content: '', done: true };
    }
}
