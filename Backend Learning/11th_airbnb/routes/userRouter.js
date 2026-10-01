const express = require('express')
const path = require('path');
const userRouter = express.Router();

const useDir  = require('../utils/utilpaths')

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(useDir,'views','user.html'))
});

module.exports = userRouter;
