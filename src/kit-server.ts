#!/usr/bin/env node
/**
 * Gemini-Kit MCP Server
 * Provides custom tools for agent orchestration
 * 
 * Modular architecture - tools split into separate modules
 * 
 * FIX 9.3: Cross-platform compatible (no Unix shell commands)
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Import tool modules
import { registerGitTools } from './tools/git.js';
import { registerKnowledgeTools } from './tools/knowledge.js';
import { registerIntegrationTools } from './tools/integration.js';
import { safeGit, findFiles } from './tools/security.js';

const server = new McpServer({
    name: 'gemini-kit-agents',
    version: '1.0.0',
});

// ═══════════════════════════════════════════════════════════════
// REGISTER MODULAR TOOLS
// ═══════════════════════════════════════════════════════════════
registerGitTools(server);           // Tools 1, 2, 6, 11
registerKnowledgeTools(server);     // Tools 7, 8, 9, 10, 12, 13
registerIntegrationTools(server);   // Tools 14, 15, 16, 17

// ═══════════════════════════════════════════════════════════════
// TOOL 3: GET PROJECT CONTEXT (FIX 9.3 - Cross-platform)
// ═══════════════════════════════════════════════════════════════
server.tool(
    'kit_get_project_context',
    'Gather project context including structure, dependencies, and recent changes',
    { depth: z.number().optional().default(2).describe('Directory depth to scan') },
    async ({ depth = 2 }) => {
        try {
            // FIX 9.3: Use cross-platform findFiles instead of Unix shell commands
            const projectDir = process.cwd();
            const allExtensions = ['.ts', '.js', '.tsx', '.jsx', '.py', '.go', '.rs', '.java', '.json', '.md'];
            const files = findFiles(projectDir, allExtensions, 50);

            // Filter by depth (approximate)
            const structure = files.filter(f => {
                const parts = f.split(path.sep);
                return parts.length <= depth + 1;
            });

            let packageInfo = null;
            const pkgPath = path.join(projectDir, 'package.json');
            if (fs.existsSync(pkgPath)) {
                try {
                    packageInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
                } catch { }
            }

            let gitLog = '';
            try {
                gitLog = safeGit(['log', '--oneline', '-5']);
            } catch { }

            return {
                content: [{
                    type: 'text' as const,
                    text: JSON.stringify({
                        structure: structure,
                        package: packageInfo ? {
                            name: packageInfo.name,
                            version: packageInfo.version,
                            dependencies: Object.keys(packageInfo.dependencies || {})
                        } : null,
                        recentCommits: gitLog.split('\n').filter(Boolean),
                    }, null, 2),
                }],
            };
        } catch (error) {
            return { content: [{ type: 'text' as const, text: `Error getting context: ${error}` }] };
        }
    }
);

// ═══════════════════════════════════════════════════════════════
// TOOL 4: HANDOFF AGENT
// ═══════════════════════════════════════════════════════════════
server.tool(
    'kit_handoff_agent',
    'Handoff context to another agent in the workflow',
    {
        fromAgent: z.string().describe('Current agent name'),
        toAgent: z.string().describe('Target agent name'),
        context: z.string().describe('Context to pass'),
        artifacts: z.array(z.string()).optional().describe('File paths of artifacts'),
    },
    async ({ fromAgent, toAgent, context, artifacts }) => {
        try {
            const handoffDir = path.join(process.cwd(), '.gemini-kit', 'handoffs');
            fs.mkdirSync(handoffDir, { recursive: true });

            const handoff = { timestamp: new Date().toISOString(), from: fromAgent, to: toAgent, context, artifacts: artifacts || [] };
            const filename = `${Date.now()}-${fromAgent}-${toAgent}.json`;
            fs.writeFileSync(path.join(handoffDir, filename), JSON.stringify(handoff, null, 2));

            return { content: [{ type: 'text' as const, text: `✅ Handoff from ${fromAgent} → ${toAgent}\n\nContext: ${context.slice(0, 200)}...` }] };
        } catch (error) {
            return { content: [{ type: 'text' as const, text: `Error in handoff: ${error}` }] };
        }
    }
);

// ═══════════════════════════════════════════════════════════════
// TOOL 5: SAVE ARTIFACT
// ═══════════════════════════════════════════════════════════════
server.tool(
    'kit_save_artifact',
    'Save an artifact (plan, report, log) from agent work',
    {
        name: z.string().describe('Artifact name'),
        type: z.enum(['plan', 'report', 'log', 'other']).describe('Artifact type'),
        content: z.string().describe('Artifact content'),
    },
    async ({ name, type, content }) => {
        try {
            const artifactDir = path.join(process.cwd(), '.gemini-kit', 'artifacts', type);
            fs.mkdirSync(artifactDir, { recursive: true });

            const safeName = String(name).replace(/\s+/g, '-');
            const filename = `${safeName}-${Date.now()}.md`;
            const filepath = path.join(artifactDir, filename);
            fs.writeFileSync(filepath, content);

            return { content: [{ type: 'text' as const, text: `✅ Artifact saved: ${filepath}` }] };
        } catch (error) {
            return { content: [{ type: 'text' as const, text: `Error saving artifact: ${error}` }] };
        }
    }
);

// ═══════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════
const transport = new StdioServerTransport();
await server.connect(transport);
