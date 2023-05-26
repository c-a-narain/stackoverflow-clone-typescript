import express from "express";
const app = express();
import MD5 from "md5";
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());

import { errorHandler } from "../helpers/error-handler";
import { queryRunner } from "../utils/connection";
import { tokenGenerator } from "../middleware/jwt-validation";
import { responsefunc, responseDisplay } from "../helpers/response";

const login = async (req: Request, res: Response) => {
  const { EMAIL, PASSWORD }: any = req.body;

  try {
    const values: [string[]] = [[EMAIL, PASSWORD]];
    const email = await queryRunner(
      "SELECT Email FROM USER3 WHERE Email = '" + EMAIL + "';"
    );

    if (email == undefined) {
      return console.error();
    } else {
      const pswd = await queryRunner(
        "SELECT Password FROM USER3 WHERE EMAIL = '" + EMAIL + "';"
      );

      if (MD5(PASSWORD) === pswd[0].Password) {
        const tk = await tokenGenerator(req.body);
        console.log(tk);

        await responseDisplay(201, true, "Login Successfull", tk, res);
      }
    }
    return;
  } catch (err: any) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
};

export { login };
