import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const meta = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: duration,
    };

    const message = `HTTP ${req.method} ${req.path}`;
    if (res.statusCode >= 400) {
      logger.error(message, null, meta);
    } else {
      logger.info(message, meta);
    }
  });

  next();
}
