/**
 * Tests for Team Orchestrator
 */

import { describe, it, expect } from 'vitest';
import { teamOrchestrator } from '../../src/agents/orchestrator';
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

describe('TeamOrchestrator', () => {
    it('should register agents', () => {
        const agent = new MockAgent('test-register');
        teamOrchestrator.register(agent);

        expect(teamOrchestrator.getAgent('test-register')).toBe(agent);
    });

    it('should return undefined for unregistered agents', () => {
        expect(teamOrchestrator.getAgent('nonexistent-agent')).toBeUndefined();
    });

    it('should list all registered agents', () => {
        teamOrchestrator.register(new MockAgent('list-agent1'));
        teamOrchestrator.register(new MockAgent('list-agent2'));

        const agents = teamOrchestrator.listTeam();
        expect(agents).toContain('list-agent1');
        expect(agents).toContain('list-agent2');
    });

    it('should start team session', () => {
        const teamCtx = teamOrchestrator.startSession('/test/path', 'test task');
        expect(teamCtx).toBeDefined();
        expect(teamCtx.getFullContext().currentTask).toBe('test task');
    });

    it('should work with registered agents', async () => {
        const agent = new MockAgent('workflow-agent');
        teamOrchestrator.register(agent);
        teamOrchestrator.startSession('/test', 'workflow test');

        agent.initialize({
            projectRoot: '/test',
            currentTask: 'workflow test',
            sharedData: {},
        });

        const result = await agent.execute();

        expect(result.success).toBe(true);
        expect(agent.executionCount).toBeGreaterThan(0);
    });
});
