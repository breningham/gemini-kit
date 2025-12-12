/**
 * Provider Manager
 * Manages AI provider selection and switching
 * Supports CLIProxyAPI via baseURL
 */

import { BaseProvider, Message, GenerateOptions, GenerateResult, StreamChunk } from './base-provider.js';
import { GeminiProvider } from './gemini.js';
import { ClaudeProvider } from './claude.js';
import { OpenAIProvider } from './openai.js';
import { loadConfig } from '../utils/config.js';

export type ProviderName = 'gemini' | 'claude' | 'openai' | 'cliproxy';

export interface ProviderConfig {
    apiKey: string;
    model?: string;
    baseURL?: string;
}

export class ProviderManager {
    private providers: Map<ProviderName, BaseProvider> = new Map();
    private activeProvider: ProviderName = 'gemini';

    constructor() {
        this.loadFromConfig();
    }

    private loadFromConfig(): void {
        const config = loadConfig();

        if (config.providers.gemini?.apiKey) {
            this.register('gemini', new GeminiProvider(
                config.providers.gemini.apiKey,
                config.providers.gemini.model
            ));
        }

        if (config.providers.claude?.apiKey) {
            this.register('claude', new ClaudeProvider(
                config.providers.claude.apiKey,
                config.providers.claude.model
            ));
        }

        if (config.providers.openai?.apiKey) {
            this.register('openai', new OpenAIProvider(
                config.providers.openai.apiKey,
                config.providers.openai.model,
                config.providers.openai.baseURL
            ));
        }

        // CLIProxyAPI support - uses OpenAI-compatible API
        if (config.providers.cliproxy?.baseURL) {
            this.register('cliproxy', new OpenAIProvider(
                config.providers.cliproxy.apiKey || 'cliproxy',
                config.providers.cliproxy.model || 'gemini-2.5-pro',
                config.providers.cliproxy.baseURL
            ));
        }

        this.activeProvider = config.defaultProvider;
    }

    /**
     * Register a provider
     */
    register(name: ProviderName, provider: BaseProvider): void {
        this.providers.set(name, provider);
    }

    /**
     * Get a provider by name
     */
    get(name: ProviderName): BaseProvider | undefined {
        return this.providers.get(name);
    }

    /**
     * Get active provider
     */
    getActive(): BaseProvider | undefined {
        return this.providers.get(this.activeProvider);
    }

    /**
     * Set active provider
     */
    setActive(name: ProviderName): boolean {
        if (!this.providers.has(name)) {
            return false;
        }
        this.activeProvider = name;
        return true;
    }

    /**
     * Get active provider name
     */
    getActiveName(): ProviderName {
        return this.activeProvider;
    }

    /**
     * List available providers
     */
    listAvailable(): ProviderName[] {
        return Array.from(this.providers.keys());
    }

    /**
     * Generate using active provider
     */
    async generate(
        messages: Message[],
        options?: GenerateOptions
    ): Promise<GenerateResult> {
        const provider = this.getActive();
        if (!provider) {
            throw new Error(`No active provider configured`);
        }
        return provider.generate(messages, options);
    }

    /**
     * Generate stream using active provider
     */
    async *generateStream(
        messages: Message[],
        options?: GenerateOptions
    ): AsyncGenerator<StreamChunk> {
        const provider = this.getActive();
        if (!provider) {
            throw new Error(`No active provider configured`);
        }
        yield* provider.generateStream(messages, options);
    }
}

// Singleton instance
export const providerManager = new ProviderManager();
