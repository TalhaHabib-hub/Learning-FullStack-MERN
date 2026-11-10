// hostRouter.js = admin
const {addHome,addHomePost,admin,homeListadmin,editHome} = require('../controllers/controller.js')

const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/admin/add-home",addHome )
hostRouter.get("/admin",admin )
hostRouter.post("/admin/add-home", addHomePost)
hostRouter.get("/admin/home-list",homeListadmin )
hostRouter.get("/admin/edit-home",editHome )

exports.hostRouter = hostRouter;
