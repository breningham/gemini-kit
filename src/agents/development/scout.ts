/**
 * Scout Agent
 * Quickly locate relevant files using parallel search
 * Acts as the Senior Developer who knows the codebase
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
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
        const teamCtx = getTeamContext();

        logger.agent(this.name, `Scouting for: ${ctx.currentTask}`);

        try {
            // Check for handoff from planner
            let additionalKeywords: string[] = [];
            if (teamCtx) {
                const handoff = teamCtx.getLastHandoff();
                if (handoff && handoff.to === this.name) {
                    logger.info(`📨 Received handoff from ${handoff.from}: ${handoff.content}`);
                    // Extract keywords from plan summary
                    const planData = handoff.data as { planSummary?: string } | undefined;
                    if (planData?.planSummary) {
                        additionalKeywords = this.extractKeywords(planData.planSummary);
                    }
                }
            }

            const results: ScoutResult[] = [];
            const taskKeywords = this.extractKeywords(ctx.currentTask);
            const keywords = [...new Set([...taskKeywords, ...additionalKeywords])];

            // Search the codebase
            await this.searchDirectory(ctx.projectRoot, keywords, results);

            // Sort by relevance
            results.sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.relevance] - order[b.relevance];
            });

            logger.success(`Found ${results.length} relevant items`);

            // Share findings with team
            if (teamCtx) {
                // Add relevant files to shared knowledge
                const relevantFiles = results
                    .filter(r => r.type === 'file')
                    .map(r => r.path);
                teamCtx.addRelevantFiles(relevantFiles);

                // Add as artifact
                teamCtx.addArtifact('codebase-analysis', {
                    name: 'scout-results',
                    type: 'analysis',
                    createdBy: this.name,
                    content: JSON.stringify(results.slice(0, 20), null, 2),
                });

                // Report to team
                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'info',
                    `Found ${results.length} relevant files. Top ${Math.min(5, results.length)}: ${results.slice(0, 5).map(r => r.path.split('/').pop()).join(', ')
                    }`
                );

                // Handoff to coder
                teamCtx.sendMessage(
                    this.name,
                    'coder',
                    'handoff',
                    `I found the relevant files. Here are the key ones to work with.`,
                    {
                        relevantFiles: relevantFiles.slice(0, 10),
                        highRelevance: results.filter(r => r.relevance === 'high').length
                    }
                );
            }

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

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Scouting failed: ${message}`);
            }

            return this.createOutput(false, `Scouting failed: ${message}`, {
                error: message,
            });
        }
    }

    private extractKeywords(task: string): string[] {
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
        if (depth > 5) return;

        try {
            const entries = readdirSync(dir);

            for (const entry of entries) {
                if (this.ignoreDirs.includes(entry)) continue;

                const fullPath = join(dir, entry);
                const stat = statSync(fullPath);

                if (stat.isDirectory()) {
                    const relevance = this.checkRelevance(entry, keywords);
                    if (relevance !== 'low') {
                        results.push({
                            path: fullPath,
                            type: 'directory',
                            relevance,
                            reason: `Directory name matches keywords`,
                        });
                    }
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
