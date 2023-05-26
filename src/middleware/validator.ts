import { NextFunction } from "express";
import { errorHandler } from "../helpers/error-handler";
import { loginSchema, postSchema } from "../model/schema";

const loginValidator = (
  req: Request,
  res: Response,
  err: any,
  next: NextFunction
) => {
  const result = loginSchema.validate(req.body);

  if (result.error) {
    new errorHandler(401, false, err.message, {}, res);
  } else {
    next();
  }
};

const postValidator = (
  req: Request,
  res: Response,
  err: any,
  next: NextFunction
) => {
  const result = postSchema.validate(req.body);

  if (result.error) {
    new errorHandler(401, false, err.message, {}, res);
  } else {
    next();
  }
};

export { loginValidator, postValidator };
