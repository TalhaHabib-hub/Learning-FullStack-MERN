
const {addHome,addHomePost} = require('../controllers/controller.js')

const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home",addHome )
hostRouter.post("/add-home",addHomePost)

exports.hostRouter = hostRouter;
