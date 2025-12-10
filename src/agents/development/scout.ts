/**
 * Scout Agent
 * Quickly locate relevant files using parallel search
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { logger } from '../../utils/logger.js';

export interface ScoutResult {
    path: string;
    type: 'file' | 'directory';
    relevance: 'high' | 'medium' | 'low';
    reason: string;
}

export class ScoutAgent extends BaseAgent {
    private ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];
    private codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.java'];

    constructor() {
        super({
            name: 'scout',
            description: 'Quickly locate relevant files using parallel search',
            category: 'development',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Scouting for: ${ctx.currentTask}`);

        try {
            const results: ScoutResult[] = [];
            const keywords = this.extractKeywords(ctx.currentTask);

            // Search the codebase
            await this.searchDirectory(ctx.projectRoot, keywords, results);

            // Sort by relevance
            results.sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.relevance] - order[b.relevance];
            });

            logger.success(`Found ${results.length} relevant items`);

            return this.createOutput(
                true,
                `Found ${results.length} relevant files/directories`,
                {
                    results,
                    keywords,
                    summary: this.generateSummary(results),
                },
                results.filter((r) => r.type === 'file').map((r) => r.path),
                'coder' // Next agent
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Scouting failed: ${message}`);

            return this.createOutput(false, `Scouting failed: ${message}`, {
                error: message,
            });
        }
    }

    private extractKeywords(task: string): string[] {
        // Simple keyword extraction
        return task
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter((word) => word.length > 2);
    }

    private async searchDirectory(
        dir: string,
        keywords: string[],
        results: ScoutResult[],
        depth: number = 0
    ): Promise<void> {
        if (depth > 5) return; // Max depth

        try {
            const entries = readdirSync(dir);

            for (const entry of entries) {
                if (this.ignoreDirs.includes(entry)) continue;

                const fullPath = join(dir, entry);
                const stat = statSync(fullPath);

                if (stat.isDirectory()) {
                    // Check directory name for relevance
                    const relevance = this.checkRelevance(entry, keywords);
                    if (relevance !== 'low') {
                        results.push({
                            path: fullPath,
                            type: 'directory',
                            relevance,
                            reason: `Directory name matches keywords`,
                        });
                    }

                    // Recurse into directory
                    await this.searchDirectory(fullPath, keywords, results, depth + 1);
                } else if (stat.isFile()) {
                    const ext = extname(entry);
                    if (!this.codeExtensions.includes(ext)) continue;

                    const relevance = this.checkRelevance(entry, keywords);
                    if (relevance !== 'low') {
                        results.push({
                            path: fullPath,
                            type: 'file',
                            relevance,
                            reason: `File name matches keywords`,
                        });
                    }
                }
            }
        } catch {
            // Skip directories we can't read
        }
    }

    private checkRelevance(name: string, keywords: string[]): 'high' | 'medium' | 'low' {
        const lowerName = name.toLowerCase();
        let matches = 0;

        for (const keyword of keywords) {
            if (lowerName.includes(keyword)) {
                matches++;
            }
        }

        if (matches >= 2) return 'high';
        if (matches === 1) return 'medium';
        return 'low';
    }

    private generateSummary(results: ScoutResult[]): string {
        const high = results.filter((r) => r.relevance === 'high');
        const medium = results.filter((r) => r.relevance === 'medium');

        return `Found ${high.length} high-relevance and ${medium.length} medium-relevance items`;
    }
}

export const scoutAgent = new ScoutAgent();
