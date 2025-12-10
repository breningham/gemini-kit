/**
 * Logger utilities
 */

import chalk from 'chalk';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS = {
    debug: chalk.gray,
    info: chalk.cyan,
    warn: chalk.yellow,
    error: chalk.red,
};

const LOG_PREFIXES = {
    debug: '🔍',
    info: 'ℹ️ ',
    warn: '⚠️ ',
    error: '❌',
};

class Logger {
    private level: LogLevel = 'info';

    setLevel(level: LogLevel): void {
        this.level = level;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }

    debug(message: string, ...args: unknown[]): void {
        if (this.shouldLog('debug')) {
            console.log(LOG_COLORS.debug(`${LOG_PREFIXES.debug} ${message}`), ...args);
        }
    }

    info(message: string, ...args: unknown[]): void {
        if (this.shouldLog('info')) {
            console.log(LOG_COLORS.info(`${LOG_PREFIXES.info} ${message}`), ...args);
        }
    }

    warn(message: string, ...args: unknown[]): void {
        if (this.shouldLog('warn')) {
            console.warn(LOG_COLORS.warn(`${LOG_PREFIXES.warn} ${message}`), ...args);
        }
    }

    error(message: string, ...args: unknown[]): void {
        if (this.shouldLog('error')) {
            console.error(LOG_COLORS.error(`${LOG_PREFIXES.error} ${message}`), ...args);
        }
    }

    // Agent-specific logging
    agent(agentName: string, message: string): void {
        console.log(chalk.magenta(`🤖 [${agentName}]`), message);
    }

    // Step logging
    step(stepNumber: number, message: string): void {
        console.log(chalk.blue(`📌 Step ${stepNumber}:`), message);
    }

    // Success logging
    success(message: string): void {
        console.log(chalk.green(`✅ ${message}`));
    }
}

export const logger = new Logger();
