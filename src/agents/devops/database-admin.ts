/**
 * Database Admin Agent
 * Database optimization, query analysis, and administration
 */

import { BaseAgent, AgentOutput } from '../base-agent.js';
import { providerManager } from '../../providers/index.js';
import { logger } from '../../utils/logger.js';

export class DatabaseAdminAgent extends BaseAgent {
    constructor() {
        super({
            name: 'database-admin',
            description: 'Database optimization, query analysis, and administration',
            category: 'devops',
        });
    }

    async execute(): Promise<AgentOutput> {
        const ctx = this.getContext();
        logger.agent(this.name, `Analyzing database: ${ctx.currentTask}`);

        try {
            const prompt = `You are a database administrator expert. Analyze and provide recommendations for:

Task: ${ctx.currentTask}

${ctx.sharedData.schema ? `Schema:\n${ctx.sharedData.schema}` : ''}
${ctx.sharedData.query ? `Query:\n${ctx.sharedData.query}` : ''}

Provide:
1. **Analysis** - What the current state looks like
2. **Optimizations** - Query/schema improvements
3. **Indexing Recommendations**
4. **Security Considerations**
5. **Backup Strategy**
6. **Migration Plan** (if applicable)

Support: PostgreSQL, MySQL, MongoDB, SQLite, Redis.`;

            const result = await providerManager.generate([
                { role: 'user', content: prompt },
            ]);

            logger.success('Database analysis complete');

            return this.createOutput(
                true,
                'Database analysis complete',
                { analysis: result.content },
                []
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return this.createOutput(false, message, {});
        }
    }
}

export const databaseAdminAgent = new DatabaseAdminAgent();
