const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/utilpaths')


hostRouter.get("/add_home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'host.html'));
});

hostRouter.use(express.urlencoded());
hostRouter.post("/add_home", (req, res, next) => {
 res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

module.exports = hostRouter;