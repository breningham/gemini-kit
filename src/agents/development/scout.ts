/**
 * Scout Agent
 * Quickly locate relevant files using SEMANTIC SEARCH
 * NOW searches file CONTENT and extracts symbols (functions, classes)
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { getTeamContext } from '../../context/team-context.js';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join, extname } from 'path';
import { logger } from '../../utils/logger.js';

export interface ScoutResult {
    path: string;
    type: 'file' | 'directory';
    relevance: 'high' | 'medium' | 'low';
    reason: string;
    symbols?: string[];
    matchedLines?: string[];
}

export class ScoutAgent extends BaseAgent {
    private ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.gemini-kit'];
    private codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.java', '.vue', '.svelte'];

    constructor() {
        super({
            name: 'scout',
            description: 'Quickly locate relevant files using semantic search + symbol extraction',
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
                    const planData = handoff.data as { planSummary?: string } | undefined;
                    if (planData?.planSummary) {
                        additionalKeywords = this.extractKeywords(planData.planSummary);
                    }
                }
            }

            const results: ScoutResult[] = [];
            const taskKeywords = this.extractKeywords(ctx.currentTask);
            const keywords = [...new Set([...taskKeywords, ...additionalKeywords])];

            // Search the codebase with content analysis
            await this.searchDirectory(ctx.projectRoot, keywords, results);

            // Sort by relevance
            results.sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.relevance] - order[b.relevance];
            });

            logger.success(`Found ${results.length} relevant items`);

            // Share findings with team
            if (teamCtx) {
                const relevantFiles = results
                    .filter(r => r.type === 'file')
                    .map(r => r.path);
                teamCtx.addRelevantFiles(relevantFiles);

                // Add symbols as artifact
                const allSymbols = results.flatMap(r => r.symbols || []);
                teamCtx.addArtifact('codebase-analysis', {
                    name: 'scout-results',
                    type: 'analysis',
                    createdBy: this.name,
                    content: JSON.stringify({
                        files: results.slice(0, 20),
                        symbols: allSymbols.slice(0, 50)
                    }, null, 2),
                });

                teamCtx.sendMessage(
                    this.name,
                    'all',
                    'info',
                    `Found ${results.length} files, ${allSymbols.length} symbols. Top: ${results.slice(0, 3).map(r => r.path.split('/').pop()).join(', ')}`
                );

                teamCtx.sendMessage(
                    this.name,
                    'coder',
                    'handoff',
                    `Found relevant files with ${allSymbols.length} symbols.`,
                    {
                        relevantFiles: relevantFiles.slice(0, 10),
                        symbols: allSymbols.slice(0, 30),
                        highRelevance: results.filter(r => r.relevance === 'high').length
                    }
                );
            }

            return this.createOutput(
                true,
                `Found ${results.length} files with semantic search`,
                {
                    results,
                    keywords,
                    summary: this.generateSummary(results),
                },
                results.filter(r => r.type === 'file').map(r => r.path),
                'coder'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Scouting failed: ${message}`);

            if (teamCtx) {
                teamCtx.sendMessage(this.name, 'all', 'info', `⚠️ Scouting failed: ${message}`);
            }

            return this.createOutput(false, `Scouting failed: ${message}`, { error: message });
        }
    }

    private extractKeywords(task: string): string[] {
        return task
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2);
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
                            reason: 'Directory name matches keywords',
                        });
                    }
                    await this.searchDirectory(fullPath, keywords, results, depth + 1);
                } else if (stat.isFile()) {
                    const ext = extname(entry);
                    if (!this.codeExtensions.includes(ext)) continue;

                    // Check filename first
                    const fileRelevance = this.checkRelevance(entry, keywords);

                    // Also search content
                    const contentResult = this.searchFileContent(fullPath, keywords);

                    // Combine relevance
                    const finalRelevance = contentResult.relevance === 'high' ? 'high'
                        : (fileRelevance === 'high' || contentResult.relevance === 'medium') ? 'medium'
                            : fileRelevance;

                    if (finalRelevance !== 'low' || contentResult.symbols.length > 0) {
                        results.push({
                            path: fullPath,
                            type: 'file',
                            relevance: finalRelevance,
                            reason: contentResult.matchedLines.length > 0
                                ? `Content matches: ${contentResult.matchedLines.length} lines`
                                : 'File name matches keywords',
                            symbols: contentResult.symbols,
                            matchedLines: contentResult.matchedLines.slice(0, 5),
                        });
                    }
                }
            }
        } catch {
            // Skip directories we can't read
        }
    }

    /**
     * Search file content for keywords and extract symbols
     */
    private searchFileContent(filePath: string, keywords: string[]): {
        relevance: 'high' | 'medium' | 'low';
        symbols: string[];
        matchedLines: string[];
    } {
        try {
            const content = readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            const matchedLines: string[] = [];
            const symbols: string[] = [];

            // Extract symbols (functions, classes, interfaces)
            const symbolPatterns = [
                /(?:export\s+)?(?:async\s+)?function\s+(\w+)/g,
                /(?:export\s+)?class\s+(\w+)/g,
                /(?:export\s+)?interface\s+(\w+)/g,
                /(?:export\s+)?type\s+(\w+)\s*=/g,
                /(?:export\s+)?const\s+(\w+)\s*=/g,
                /def\s+(\w+)\s*\(/g,  // Python
                /func\s+(\w+)\s*\(/g, // Go
            ];

            for (const pattern of symbolPatterns) {
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    if (match[1] && !symbols.includes(match[1])) {
                        symbols.push(match[1]);
                    }
                }
            }

            // Search for keywords in content
            const lowerContent = content.toLowerCase();
            let matchCount = 0;

            for (const keyword of keywords) {
                if (lowerContent.includes(keyword)) {
                    matchCount++;

                    // Find matching lines
                    for (let i = 0; i < lines.length && matchedLines.length < 10; i++) {
                        if (lines[i].toLowerCase().includes(keyword)) {
                            matchedLines.push(`L${i + 1}: ${lines[i].trim().slice(0, 100)}`);
                        }
                    }
                }
            }

            const relevance: 'high' | 'medium' | 'low' =
                matchCount >= 3 ? 'high' :
                    matchCount >= 1 ? 'medium' : 'low';

            return { relevance, symbols, matchedLines };
        } catch {
            return { relevance: 'low', symbols: [], matchedLines: [] };
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
        const high = results.filter(r => r.relevance === 'high');
        const symbols = results.flatMap(r => r.symbols || []);
        return `Found ${high.length} high-relevance files, ${symbols.length} symbols extracted`;
    }
}

export const scoutAgent = new ScoutAgent();
