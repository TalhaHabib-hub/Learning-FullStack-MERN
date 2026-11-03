const express = require("express");
const newRouter = express.Router();
const Home = require("../models/home");

exports.addhome = (req, res, next) => {
  res.render("host", { pageTitle: "Become a host" });
};

newRouter.use(express.urlencoded());


exports.addhomeP = (req, res, next) => {
  const { pricePerNight, location, rating } = req.body;
  const image = req.file ? `/uploads/${encodeURIComponent(req.file.filename)}` : null;
  const home = new Home(req.body.addedHome, pricePerNight, location, image, rating);
  home.save();
  res.render("success", {
    pageTitle: "Home registered",
    homeNow: req.body.addedHome,
  });
};


exports.deletingHomes = (req, res) => {
  const homeIndex = Number(req.params.homeIndex);
  const addedHomes = Home.fetchAll();
  if (
    !Number.isInteger(homeIndex) ||
    homeIndex < 0 ||
    homeIndex >= addedHomes.length
  ) {
    return res.sendStatus(404);
  }

  Home.delete(homeIndex);
  res.redirect("/");
};

exports.user = (req, res, next) => {
  const addedHomes = Home.fetchAll();
  console.log(addedHomes);
  res.render('user',{pageTitle: 'Home',addedHomes: addedHomes});
}

exports.error = (req, res, next) => {
  res.status(404).render('error',{pageTitle :'page not found'})
}
