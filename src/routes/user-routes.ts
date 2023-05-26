const userRouter = require("express").Router();
import { loginValidator } from "../middleware/validator";
import { login } from "../controller/user-controller";

userRouter.get("/login", loginValidator, login);

export default userRouter;
