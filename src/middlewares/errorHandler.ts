import { NextFunction, Request, Response } from "express";
import { DEBUG_MODE } from "../config/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let data: { message: string; originalError?: string } = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }
  return res.status(statusCode).json(data);
};

export default errorHandler;
