const express = require('express');
const homeSlashRouter = express.Router();
const utilsroute = require('../utils/utilsPath')
const path = require('path')


homeSlashRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(utilsroute,'views','home.html'))
});

module.exports = homeSlashRouter;