/* eslint-disable no-console */

type LogContext = Record<string, unknown>;

class Logger {
  debug(message: string, context?: LogContext): void {
    if (!import.meta.env.DEV) {
      return;
    }

    console.debug(message, context ?? '');
  }

  info(message: string, context?: LogContext): void {
    console.info(message, context ?? '');
  }

  warn(message: string, context?: LogContext): void {
    console.warn(message, context ?? '');
  }

  error(message: string, error?: unknown, context?: LogContext): void {
    console.error(message, error, context ?? '');
  }
}

export const logger = new Logger();
