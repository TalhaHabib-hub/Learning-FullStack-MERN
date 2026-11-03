const express = require('express')
const userRouter = express.Router();
const { user } = require('../controller/controller')

userRouter.get("/", user);

module.exports = userRouter;