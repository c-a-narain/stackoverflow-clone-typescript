import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
import { Request, Response } from "express";

import { queryExecuter, queryRunner } from "../utils/connection";
import { check } from "../middleware/jwt-validation";
import { responsefunc, responseDisplay } from "../helpers/response";
import { errorHandler } from "../helpers/error-handler";

const add = async (req: Request, res: Response) => {
  const { POSTID, ANSWER } = req.body;

  try {
    const values = [[POSTID, ANSWER]];

    const token = await req.headers.authorization!.split(" ")[1];
    const decode: any = await check(token);
    const UID = await queryRunner(
      "SELECT UserId FROM USER3 WHERE EMAIL = '" + decode.EMAIL + "';"
    );
    values[0].unshift(UID[0].UserId);

    if (decode) {
      const sqlst = "INSERT INTO ANSWER3 (UserId,PostId,Answer) VALUES (?)";

      await queryExecuter(sqlst, values);

      await responseDisplay(
        201,
        true,
        "Your response has been recorded",
        req.body,
        res
      );
      console.log({
        success: true,
      });
    } else {
      console.log("Error");
    }
    return;
  } catch (err: any) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
}; //post Answer

const search = async (req: Request, res: Response) => {
  const { TITLE } = req.body;
  const TAG = req.query.TAG;

  try {
    const values = [[TITLE]];
    const sqlst =
      "SELECT p.PostId,p.Title,p.Description,p.Tag, a.AnswerId,a.Answer,a.AnsweredOn FROM ANSWER3 a INNER JOIN POST3 p ON p.PostId = a.PostId WHERE Title LIKE '%" +
      TITLE +
      "%' OR TAG LIKE '%" +
      TAG +
      "%'";
    const read = await queryRunner(sqlst);

    console.log({
      success: true,
    });

    await responseDisplay(201, true, "Search Results", read, res);

    return;
  } catch (err: any) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
};

export { add, search };
