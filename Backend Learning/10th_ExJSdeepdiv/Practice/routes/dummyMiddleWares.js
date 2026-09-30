const express = require('express')
const dummyRoutes = express.Router();

dummyRoutes.use((req, res, next) => {
  console.log('1st dummy middle ware', req.url)
  next();
})
dummyRoutes.use((req, res, next) => {
  console.log('2nd dummy middle ware', req.method)
  next();
})

module.exports = dummyRoutes;