/**
 * Configuration utilities
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';

export interface ProviderSettings {
    apiKey: string;
    model: string;
    baseURL?: string;
}

export interface GeminiKitConfig {
    defaultProvider: 'gemini' | 'claude' | 'openai' | 'cliproxy';
    providers: {
        gemini?: ProviderSettings;
        claude?: ProviderSettings;
        openai?: ProviderSettings;
        cliproxy?: ProviderSettings;
    };
    autoCommit: boolean;
    autoTest: boolean;
    planApproval: boolean;
}

const DEFAULT_CONFIG: GeminiKitConfig = {
    defaultProvider: 'gemini',
    providers: {},
    autoCommit: false,
    autoTest: true,
    planApproval: true,
};

export function getConfigPath(): string {
    return join(homedir(), '.gemini-kit', 'config.json');
}

export function getProjectConfigPath(projectRoot: string): string {
    return join(projectRoot, '.gemini-kit', 'config.json');
}

export function loadConfig(projectRoot?: string): GeminiKitConfig {
    const paths = [
        projectRoot ? getProjectConfigPath(projectRoot) : null,
        getConfigPath(),
    ].filter(Boolean) as string[];

    for (const path of paths) {
        if (existsSync(path)) {
            try {
                const content = readFileSync(path, 'utf-8');
                return { ...DEFAULT_CONFIG, ...JSON.parse(content) };
            } catch {
                // Continue to next path
            }
        }
    }

    return DEFAULT_CONFIG;
}

export function saveConfig(config: GeminiKitConfig, projectRoot?: string): void {
    const path = projectRoot ? getProjectConfigPath(projectRoot) : getConfigPath();
    const dir = dirname(path);

    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    writeFileSync(path, JSON.stringify(config, null, 2));
}
