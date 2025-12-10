/**
 * Tests for Orchestrator
 */

import { describe, it, expect } from 'vitest';
import { orchestrator } from '../../src/agents/orchestrator';
import { BaseAgent, AgentOutput } from '../../src/agents/base-agent';

// Mock agent for testing
class MockAgent extends BaseAgent {
    executionCount = 0;

    constructor(agentName: string) {
        super({
            name: agentName,
            description: `Mock agent: ${agentName}`,
            category: 'development',
        });
    }

    async execute(): Promise<AgentOutput> {
        this.executionCount++;
        return this.createOutput(true, `${this.name} executed`, { count: this.executionCount });
    }
}

describe('Orchestrator', () => {
    it('should register agents', () => {
        const agent = new MockAgent('test-register');
        orchestrator.register(agent);

        expect(orchestrator.getAgent('test-register')).toBe(agent);
    });

    it('should return undefined for unregistered agents', () => {
        expect(orchestrator.getAgent('nonexistent-agent')).toBeUndefined();
    });

    it('should list all registered agents', () => {
        orchestrator.register(new MockAgent('list-agent1'));
        orchestrator.register(new MockAgent('list-agent2'));

        const agents = orchestrator.listAgents();
        expect(agents).toContain('list-agent1');
        expect(agents).toContain('list-agent2');
    });

    it('should initialize context', () => {
        orchestrator.initializeContext('/test/path', 'test task');
        // If no error, context initialization works
        expect(true).toBe(true);
    });

    it('should work with registered agents', async () => {
        const agent = new MockAgent('workflow-agent');
        orchestrator.register(agent);
        orchestrator.initializeContext('/test', 'workflow test');

        agent.initialize({
            projectRoot: '/test',
            currentTask: 'workflow test',
            sharedData: {},
        });

        const result = await agent.execute();

        expect(result.success).toBe(true);
        expect(agent.executionCount).toBe(1);
    });
});
