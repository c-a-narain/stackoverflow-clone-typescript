import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
import { Response, Request } from "express";
import { queryExecuter, queryRunner } from "../utils/connection";
import { check } from "../middleware/jwt-validation";
import { responsefunc, responseDisplay } from "../helpers/response";
import { errorHandler } from "../helpers/error-handler";
import { getPagination } from "../helpers/paging";

const add = async (req: Request, res: Response, err: any) => {
  const { TITLE, DESCRIPTION, TAG }: any = req.body;

  try {
    const values: [string[]] = [[TITLE, DESCRIPTION, TAG]];

    const token = await req.headers.authorization!.split(" ")[1];
    const decode: any = await check(token);
    const UID = await queryRunner(
      "SELECT UserId FROM USER3 WHERE EMAIL = '" + decode.EMAIL + "';"
    );
    values[0].unshift(UID[0].UserId);

    if (decode) {
      const sqlst =
        "INSERT INTO POST3 (UserId,Title,Description,Tag) VALUES (?)";

      await queryExecuter(sqlst, values);

      await responseDisplay(201, true, "Question Added", req.body, res);
      console.log({
        success: true,
      });
    } else {
      console.log("Error");
      await responseDisplay(
        401,
        false,
        "Error occured while adding question",
        req.body,
        res
      );
    }
    return;
  } catch (err: any) {
    new errorHandler(401, false, err.message, {}, res);
  }
}; //post Question

const update = async (req: Request, res: Response, err: any) => {
  const { ID, TITLE, DESCRIPTION, TAG }: any = req.body;

  try {
    const values: [string[]] = [[ID, TITLE, DESCRIPTION, TAG]];

    const token = await req.headers.authorization!.split(" ")[1];
    const decode: any = await check(token);
    const UID = await queryRunner(
      "SELECT UserId FROM USER3 WHERE EMAIL = '" + decode.EMAIL + "';"
    );

    if (decode) {
      const sqlst =
        "UPDATE POST3 SET TITLE='" +
        values[0][1] +
        "',DESCRIPTION='" +
        values[0][2] +
        "',TAG='" +
        values[0][3] +
        "' ,CreatedOn = CURRENT_TIME() WHERE PostId = '" +
        values[0][0] +
        "' AND UserId = '" +
        UID[0].UserId +
        "'";

      await queryRunner(sqlst);

      console.log({
        success: true,
      });

      await responseDisplay(201, true, "Updated Successfull", req.body, res);
    } else {
      console.log("Error");
      new errorHandler(401, false, err.message, {}, res);
    }
    return;
  } catch (err: any) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
};

const deletePost = async (req: Request, res: Response, err: any) => {
  const { ID }: any = req.body;

  try {
    const values: [string[]] = [[ID]];

    const token = await req.headers.authorization!.split(" ")[1];
    const decode: any = await check(token);
    const UID = await queryRunner(
      "SELECT UserId FROM USER3 WHERE EMAIL = '" + decode.EMAIL + "';"
    );

    if (decode) {
      const sqlst = "DELETE FROM POST3 WHERE PostId = ?";
      await queryRunner(sqlst);
      const sqlst2 = "DELETE FROM ANSWER3 WHERE PostId = ?";
      await queryRunner(sqlst2);
      // await queryExecuter(sqlst, values);

      console.log({
        success: true,
      });

      await responsefunc(201, true, "Deleted Successfully", req.body, res);
    } else {
      console.log("Error");
    }
    return;
  } catch (err: any) {
    new errorHandler(401, false, err.message, {}, res);
  }
};

const read = async (req: Request, res: Response, err: any) => {
  try {
    const token = await req.headers.authorization!.split(" ")[1];
    const decode: any = await check(token);
    const UID = await queryRunner(
      "SELECT UserId FROM USER3 WHERE EMAIL = '" + decode.EMAIL + "';"
    );
    if (decode) {
      const sqlst =
        "SELECT * FROM POST3 WHERE UserId = '" + UID[0].UserId + "' ";

      const read = await queryRunner(sqlst);

      console.log({
        success: true,
      });

      await responseDisplay(201, true, "Fetched Successfully", read, res);
    } else {
      console.log("Error");
    }

    return;
  } catch (err: any) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
};

const search = async (req: Request, res: Response, err: any) => {
  const TITLE = req.query.TITLE;
  const TAG = req.query.TAG;
  const PAGE: any = req.query.PAGE;
  const SIZE: any = req.query.SIZE;

  let { limit, offset } = getPagination(parseInt(PAGE), parseInt(SIZE));
  // limit = string()
  try {
    const sqlst =
      "SELECT * FROM POST3 WHERE Title LIKE '%" +
      TITLE +
      "%' OR Tag LIKE '%" +
      TAG +
      "%' LIMIT " +
      limit +
      " OFFSET " +
      offset +
      " ";

    const read = await queryRunner(sqlst);

    if (read.length == 0) {
      // new errorHandler(404, false, err.message, {}, res);
      await responseDisplay(404, false, "Data not Found", read, res);
    } else {
      console.log({
        success: true,
      });

      await responseDisplay(201, true, "Search Results", read, res);
    }
    return;
  } catch (err: any) {
    new errorHandler(401, false, err.message, {}, res);
  }
};

export { add, update, deletePost, read, search };
