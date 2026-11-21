// adminRouter.js = admin
const {
  loginAction,
  loginSubmit,
} = require("../controllers/controller");

const express = require("express");
const authRouter = express.Router();

authRouter.get("/login", loginAction);
authRouter.post("/login", loginSubmit);

exports.authRouter = authRouter;
