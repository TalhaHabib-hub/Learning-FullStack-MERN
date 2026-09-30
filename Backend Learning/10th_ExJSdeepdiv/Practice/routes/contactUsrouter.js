const express = require('express');
const contactUsRouter = express.Router()
const path = require('path');
const rootDir = require('../utils/utilsPath')

contactUsRouter.get("/contact-us", (req, res, next) => {
  console.log(req.url, req.header);
   res.sendFile(path.join(rootDir,'views','getContactUs.html'))
});

module.exports = contactUsRouter;