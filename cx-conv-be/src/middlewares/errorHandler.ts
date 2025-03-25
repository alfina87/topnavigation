import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

interface ErrorResponse extends Error {
  code?: number;
  keyPattern?: { [key: string]: number };
}

export class AppError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    err = new AppError(
      `Project with this ${field} already exists. Please choose a different ${field}.`,
      409
    );
  }

  logger.error(
    `Error: ${err.code || 500} - ${err.message || "Internal Server Error"}`
  );
  res
    .status(err.code || 500)
    .json({ error: err.message || "Internal Server Error" });
};

export { errorHandler };
