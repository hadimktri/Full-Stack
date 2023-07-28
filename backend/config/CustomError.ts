export default class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
// to separate the type of error
    this.isOperational = true;
// to spot the place of the error
    Error.captureStackTrace(this, this.constructor);
  }
}
