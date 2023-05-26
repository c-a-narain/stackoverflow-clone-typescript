import { Request, Response } from "express";

export const responseDisplay = async (
  statusCode: any,
  success: boolean,
  message: string,
  data: string,
  res: any
) => {
  const response = {
    message,
    success,
    data,
  };
  res.status(statusCode).send(response);
};

export const responsefunc = async (
  statusCode: any,
  success: boolean,
  message: string,
  data: string,
  res: any
) => {
  const response = {
    message,
    success,
  };
  res.status(statusCode).send(response);
};

module.exports = { responsefunc, responseDisplay };
