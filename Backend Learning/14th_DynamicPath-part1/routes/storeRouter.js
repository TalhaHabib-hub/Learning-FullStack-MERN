const {
  home,
  store,
  booking,
  favorites,
  homeDetails,
  reservations,
  Postfavorites,
  homesList,
} = require("../controllers/controller.js");
const express = require("express");
const storeRouter = express.Router();

storeRouter.get("/", home);
storeRouter.get("/store", store);
storeRouter.get("/store/booking", booking);
storeRouter.get("/store/favorites", favorites);
storeRouter.post("/store/favorite/:id", Postfavorites);
storeRouter.get("/store/home-list", homesList);
storeRouter.get("/store/reservations", reservations);
storeRouter.get("/:homeId", homeDetails);

module.exports = storeRouter;
