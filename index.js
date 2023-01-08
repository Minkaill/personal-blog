import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  articleCreateValidation,
} from "./validations.js";

import { handleValidationsErros, checkAuth } from "./utils/index.js";

import { UserController, ArticleController } from "./controllers/index.js";

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  handleValidationsErros,
  loginValidation,
  UserController.login
);
app.post(
  "/auth/register",
  handleValidationsErros,
  registerValidation,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", ArticleController.getAll);
app.get("/posts/:id", ArticleController.getOne);
app.post(
  "/posts",
  checkAuth,
  handleValidationsErros,
  articleCreateValidation,
  ArticleController.create
);
app.delete("/posts/:id", checkAuth, ArticleController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationsErros,
  articleCreateValidation,
  ArticleController.update
);

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
