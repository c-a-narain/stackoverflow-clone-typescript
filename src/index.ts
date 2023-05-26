import express from "express";
const app = express();
app.use(express.json());
import "dotenv";

import userRoutes from "./routes/user-routes";
import { postRoutes } from "./routes/post-routes";
import { answerRoutes } from "./routes/answer-routes";

app.use("/", userRoutes);
app.use("/post", postRoutes);
app.use("/answer", answerRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
