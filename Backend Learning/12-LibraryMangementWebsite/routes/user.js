const express = require('express');
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.render('user', { pageTitle: 'User Panel' });
});

module.exports = userRouter;