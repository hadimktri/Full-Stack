import { NextFunction, Request, Response } from "express";
import CustomError from "../config/CustomError";

const devErrors = (res: Response, error: any) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const duplicateKeyErrorHandler = (err: any) => {
  const key = err.meta.target;
  const msg = `There is already a post with the same ${key}. Please use another ${key}!`;

  return new CustomError(msg, 400);
};

const validationErrorHandler = (err: any) =>
  new CustomError("Missing field or Incorrect field type provided", 400);

/** for all other errors use of costumError will set isOprational to true to make the error distinguished 400 to 499 */
const prodErrors = (res: Response, err: any) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

//*** all 4 (error, req, res, next) are needed here even if not used because error will not be recognized */
export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.code === "P2002") error = duplicateKeyErrorHandler(error);
    if (error.name === "PrismaClientValidationError")
      error = validationErrorHandler(error);
    prodErrors(res, error);
  }
};

//  if (
//     error.name ===
//     ("PrismaClientKnownRequestError" ||
//       "PrismaClientUnknownRequestError" ||
//       "PrismaClientRustPanicError" ||
//       "PrismaClientInitializationError" ||
//       "PrismaClientValidationError")
//   ) {}

// if (error.name === "PrismaClientValidationError") error = castErrorHandler(error);
// const castErrorHandler = (err: any) => {
//   const msg = `Invalid value for ${err.path}: ${err.value}!`;
//   return new CustomError(msg, 400);
// };
