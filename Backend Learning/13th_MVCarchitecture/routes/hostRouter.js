const express = require("express");
const multer = require("multer");
const hostRouter = express.Router();
const fs = require("fs");
const path = require("path");
const { addhome, addhomeP, deletingHomes } = require("../controller/controller");

const uploadDir = path.join(__dirname, "..", "public", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

hostRouter.get("/add_home", addhome);
hostRouter.post("/add_home", upload.single("image"), addhomeP);
hostRouter.post("/delete_home/:homeIndex", deletingHomes);

exports.hostRouter = hostRouter;
