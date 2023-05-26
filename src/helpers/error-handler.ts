import { Response } from "express";

import { responseDisplay } from "../helpers/response";

class errorHandler extends Error {
  constructor(
    statusCode: any,
    success: any,
    message: any,
    data: any,
    res: any
  ) {
    super(message);
    responseDisplay(statusCode, success, message, data, res);
  }
}

export { errorHandler };
