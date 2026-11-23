// adminRouter.js = admin
const {
  loginAction,
  loginSubmit,
  postlogout,
} = require("../controllers/controller");

const express = require("express");
const authRouter = express.Router();

authRouter.get("/login", loginAction);
authRouter.post("/login", loginSubmit);
authRouter.post("/logout", postlogout);

exports.authRouter = authRouter;
