const {home} = require('../controllers/controller.js')
const express = require('express');
const userRouter = express.Router();

userRouter.get("/", home);

module.exports = userRouter;