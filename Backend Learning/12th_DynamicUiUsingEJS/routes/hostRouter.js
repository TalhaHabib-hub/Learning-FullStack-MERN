const express = require('express');
const hostRouter = express.Router();

const addedHomes = [];

hostRouter.use(express.urlencoded()); 

hostRouter.get("/add_home", (req, res, next) => {
  res.render('host', {pageTitle: 'Become a host'});
});

hostRouter.post("/add_home", (req, res, next) => {
  addedHomes.push({addedHome: req.body.addedHome});
  res.render('success', { pageTitle: 'Home registered', homeNow: req.body.addedHome });
});




exports.hostRouter = hostRouter;
exports.addedHomes = addedHomes;