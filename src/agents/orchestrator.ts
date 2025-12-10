/**
 * Agent Orchestrator
 * Manages agent lifecycle and execution patterns
 */

import { BaseAgent, AgentContext, AgentOutput } from './base-agent.js';

export type OrchestrationPattern = 'sequential' | 'parallel' | 'hybrid';

export interface OrchestrationConfig {
    pattern: OrchestrationPattern;
    agents: string[];
    parallelGroups?: string[][];
}

export class AgentOrchestrator {
    private agents: Map<string, BaseAgent> = new Map();
    private context: AgentContext | null = null;

    /**
     * Register an agent
     */
    register(agent: BaseAgent): void {
        this.agents.set(agent.name, agent);
    }

    /**
     * Get registered agent by name
     */
    getAgent(name: string): BaseAgent | undefined {
        return this.agents.get(name);
    }

    /**
     * List all registered agents
     */
    listAgents(): string[] {
        return Array.from(this.agents.keys());
    }

    /**
     * Initialize context for orchestration
     */
    initializeContext(projectRoot: string, task: string): void {
        this.context = {
            projectRoot,
            currentTask: task,
            sharedData: {},
        };
    }

    /**
     * Execute agents sequentially
     * planner → code → tester → reviewer → git
     */
    async executeSequential(agentNames: string[]): Promise<AgentOutput[]> {
        if (!this.context) {
            throw new Error('Context not initialized');
        }

        const results: AgentOutput[] = [];
        let previousOutput: AgentOutput | undefined;

        for (const name of agentNames) {
            const agent = this.agents.get(name);
            if (!agent) {
                console.warn(`Agent ${name} not found, skipping...`);
                continue;
            }

            // Update context with previous output
            const ctx: AgentContext = {
                ...this.context,
                previousAgentOutput: previousOutput,
            };

            agent.initialize(ctx);
            const output = await agent.execute();
            agent.cleanup();

            results.push(output);
            previousOutput = output;

            // Stop if agent failed
            if (!output.success) {
                console.error(`Agent ${name} failed:`, output.message);
                break;
            }
        }

        return results;
    }

    /**
     * Execute agents in parallel
     * scout (dir1) + scout (dir2) + scout (dir3) → aggregate
     */
    async executeParallel(agentNames: string[]): Promise<AgentOutput[]> {
        if (!this.context) {
            throw new Error('Context not initialized');
        }

        const promises = agentNames.map(async (name) => {
            const agent = this.agents.get(name);
            if (!agent) {
                return {
                    success: false,
                    agentName: name,
                    message: `Agent ${name} not found`,
                    data: {},
                    artifacts: [],
                };
            }

            agent.initialize(this.context!);
            const output = await agent.execute();
            agent.cleanup();
            return output;
        });

        return Promise.all(promises);
    }

    /**
     * Execute hybrid pattern
     * Parallel scouts → Sequential planning → Parallel implementation
     */
    async executeHybrid(config: OrchestrationConfig): Promise<AgentOutput[]> {
        const results: AgentOutput[] = [];

        if (config.parallelGroups) {
            for (const group of config.parallelGroups) {
                const groupResults = await this.executeParallel(group);
                results.push(...groupResults);
            }
        }

        return results;
    }

    /**
     * Execute the standard ClaudeKit workflow
     * /cook triggers: planner → code → tester → reviewer → docs → git
     */
    async executeCookWorkflow(task: string): Promise<AgentOutput[]> {
        const workflow = [
            'planner',
            'scout',
            'coder',
            'tester',
            'code-reviewer',
            'docs-manager',
            'git-manager',
        ];

        this.initializeContext(process.cwd(), task);
        return this.executeSequential(workflow);
    }
}

// Singleton instance
export const orchestrator = new AgentOrchestrator();
