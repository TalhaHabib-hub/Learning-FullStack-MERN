const express = require("express");
const multer = require("multer");
const path = require("path");
const hostRouter = express.Router();

const addedHomes = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

hostRouter.use(express.urlencoded());
hostRouter.get("/add_home", (req, res, next) => {
  res.render("host", { pageTitle: "Become a host" });
});

hostRouter.post("/add_home", upload.single("image"), (req, res, next) => {
  addedHomes.push({
    addedHome: req.body.addedHome,
    pricePerNight: req.body.pricePerNight,
    location: req.body.location,
    image: req.file ? "/uploads/" + req.file.filename : null,
    rating: req.body.rating,
  });
  console.log(addedHomes);
  res.render("success", {
    pageTitle: "Home registered",
    homeNow: req.body.addedHome,
  });
});

exports.hostRouter = hostRouter;
exports.addedHomes = addedHomes;
