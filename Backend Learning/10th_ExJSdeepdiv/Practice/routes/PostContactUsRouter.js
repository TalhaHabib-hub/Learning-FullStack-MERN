const express = require('express');
const postContactUsRouter = express.Router();
const path = require('path');
const rootDir = require('../utils/utilsPath')
// const bodyParser = require("body-parser");


// postContactUsRouter.use(bodyParser.urlencoded());
postContactUsRouter.post("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir,'views','postContactUs.html'))

});

module.exports = postContactUsRouter;