// src/middlewares/globalErrorHandler.ts

import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction, // Prefix with underscore to mark as intentionally unused
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }

  if (error.code && error.code === 11000) {
    return res.status(409).json({
      message: `Duplicate key error: ${
        Object.keys(error.keyValue)[0]
      } must be unique.`,
      success: false,
      error: error.message,
    });
  }

  return res.status(statusCode).json({
    message,
    success: false,
    error: error,
  });
};

export default globalErrorHandler;
