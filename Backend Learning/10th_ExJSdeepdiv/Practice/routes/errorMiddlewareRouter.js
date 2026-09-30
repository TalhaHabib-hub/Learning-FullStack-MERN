const express = require('express');
const errorRouter = express.Router();
const path = require('path');
const rootdir = require('../utils/utilsPath')

errorRouter.use((req, res) => {
res.status(404).sendFile(path.join(rootdir,'views','404.html'))
})

module.exports = errorRouter;