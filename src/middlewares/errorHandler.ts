import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TimeoutError, PuppeteerError, ProtocolError } from "puppeteer";
import { ApiError, logger } from "../utils";
import { env } from "../config";

const formatZodError = (zodError: ZodError) => {
  const messageArr = zodError.issues?.map((issue) => issue.message);
  return messageArr?.join(", ");
};

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  } else if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: {
        code: "VALIDATION_ERROR",
        message: formatZodError(err),
      },
    });
  } else if (err instanceof ProtocolError) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: {
        code: "INTERNAL_ERROR",
        message: err.message,
      },
    });
  } else if (err instanceof TimeoutError) {
    return res.status(408).json({
      success: false,
      status: 408,
      error: {
        code: "TIMEOUT_ERROR",
        message: "Request timed out",
      },
    });
  } else if (err instanceof PuppeteerError) {
    // logger.error(err);
    logger.error(
      `[${req.method}] ${req.path} - ${err instanceof Error ? err.stack : err}`
    );
    return res.status(500).json({
      success: false,
      status: 500,
      error: {
        code: "INTERNAL_ERROR",
        message: err.message,
      },
    });
  } else {
    // logger.error(err);
    logger.error(
      `[${req.method}] ${req.path} - ${err instanceof Error ? err.stack : err}`
    );
    
    if (env.NODE_ENV === "development") {
      return res.status(500).json({
        success: false,
        status: 500,
        error: {
          code: "INTERNAL_ERROR",
          message: err.toString(),
        },
      });
    }
    return res.status(500).json({
      success: false,
      status: 500,
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
      },
    });
  }
};

export default errorHandler;
