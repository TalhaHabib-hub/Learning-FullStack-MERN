const {
  home,
  store,
  booking,
  favorites,
  homeDetails,
  reservations,
  homesList,
} = require("../controllers/controller.js");
const express = require("express");
const storeRouter = express.Router();

storeRouter.get("/", home);
storeRouter.get("/store", store);
storeRouter.get("/store/booking", booking);
storeRouter.get("/store/favorites", favorites);
storeRouter.get("/store/home-details", homeDetails);
storeRouter.get("/store/home-list", homesList);
storeRouter.get("/store/reservations", reservations);

module.exports = storeRouter;
