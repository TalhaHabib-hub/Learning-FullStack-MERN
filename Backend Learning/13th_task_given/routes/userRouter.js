const {home,store,booking,favorites,homeDetails,reservations,homesList} = require('../controllers/controller.js')
const express = require('express');
const userRouter = express.Router();

userRouter.get('/', home);
userRouter.get('/store', store);
userRouter.get('/store/booking', booking);
userRouter.get('/store/favorites', favorites);
userRouter.get('/store/home-details', homeDetails);
userRouter.get('/store/home-list', homesList);
userRouter.get('/store/reservations', reservations);

module.exports = userRouter;