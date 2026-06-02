// src/utils/logger.ts

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private readonly RESET = "\x1b[0m";
  private readonly COLORS: Record<LogLevel, string> = {
    info: "\x1b[32m", // ירוק
    warn: "\x1b[33m", // צהוב
    error: "\x1b[31m", // אדום
    debug: "\x1b[36m", // תכלת
  };

  private log(
    level: LogLevel,
    message: string,
    meta: Record<string, any> = {},
  ) {
    const logObject = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      ...meta,
    };

    const logString = JSON.stringify(logObject);
    const coloredLog = `${this.COLORS[level]}${logString}${this.RESET}`;

    if (level === "error") {
      console.error(coloredLog);
    } else {
      console.log(coloredLog);
    }
  }

  public info(message: string, meta?: Record<string, any>) {
    this.log("info", message, meta);
  }

  public warn(message: string, meta?: Record<string, any>) {
    this.log("warn", message, meta);
  }

  public error(message: string, error?: any, meta?: Record<string, any>) {
    const errorMeta =
      error instanceof Error
        ? {
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
            ...meta,
          }
        : { error, ...meta };

    this.log("error", message, errorMeta);
  }

  public debug(message: string, meta?: Record<string, any>) {
    this.log("debug", message, meta);
  }
}

export const logger = new Logger();
