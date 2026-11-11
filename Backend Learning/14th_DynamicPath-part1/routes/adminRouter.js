// adminRouter.js = admin
const {
  addHome,
  addHomePost,
  admin,
  homeListadmin,
  edit,
} = require("../controllers/controller.js");

const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/admin/add-home", addHome);
adminRouter.get("/admin", admin);
adminRouter.post("/admin/add-home", addHomePost);
adminRouter.get("/admin/home-list", homeListadmin);
adminRouter.get("/admin/add-home/:id",edit)

exports.adminRouter = adminRouter;
