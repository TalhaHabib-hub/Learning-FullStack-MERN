// adminRouter.js = admin
const {
  loginAction,
  loginSubmit,
  postlogout,
  postsignup,
  getsignup,
} = require("../controllers/controller");

const express = require("express");
const authRouter = express.Router();

authRouter.get("/login", loginAction);
authRouter.get("/signup", getsignup);
authRouter.post("/login", loginSubmit);
authRouter.post("/logout", postlogout);
authRouter.post("/signup", postsignup);

exports.authRouter = authRouter;
