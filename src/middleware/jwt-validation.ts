import jwt from "jsonwebtoken";
// import { login } from "../controller/user-controller";
require("dotenv");

export async function tokenGenerator(data: any) {
  const token = jwt.sign(
    {
      EMAIL: data.EMAIL,
    },
    `${process.env.secretKey}`
  );
  return token;
}

export async function check(tokenData: any) {
  let decoded = jwt.verify(tokenData, `${process.env.secretKey}`);
  return decoded;
}

module.exports = { tokenGenerator, check };
