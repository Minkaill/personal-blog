import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, articleCreateValidation } from "./validations.js";
import * as UserController from "./controllers/user.controller.js";
import * as ArticleController from "./controllers/article.controller.js";

const app = express();
import checkAuth from "./utils/checkAuth.js";

app.use(express.json());
app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", ArticleController.getAll)
app.get("/posts/:id", ArticleController.getOne)
app.post("/posts", checkAuth, articleCreateValidation, ArticleController.create)
app.delete("/posts/:id", checkAuth, ArticleController.remove)
app.patch("/posts/:id", checkAuth, ArticleController.update)

mongoose
  .connect(
    "mongodb+srv://fringle:12345@cluster0.wgisrd8.mongodb.net/personal-blog"
  )
  .then(() => console.log("Connected MongoDB"))
  .catch((error) => console.log("DB ERROR", error));

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("SERVER OK");
});
