import {
  add,
  update,
  read,
  search,
  deletePost,
} from "../controller/post-controller";
import { postValidator } from "../middleware/validator";

const postRoutes = require("express").Router();

postRoutes.post("/add", postValidator, add);
postRoutes.post("/update", update);
postRoutes.post("/delete", deletePost);
postRoutes.get("/read", read);
postRoutes.get("/search", search);

export { postRoutes };
