import express from "express";
const app = express();
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

const promisePool = pool.promise();

export const queryExecuter = async (sqlst:string, values: any) => {
  try {
    const [err, result] = await promisePool.query(sqlst, values);
    return [err, result];
  } catch (err) {
    console.log(err);
  }
};

export const queryRunner = async (sqlst:string) => {
  try {
    const [result] = await promisePool.query(sqlst);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { queryExecuter, queryRunner };