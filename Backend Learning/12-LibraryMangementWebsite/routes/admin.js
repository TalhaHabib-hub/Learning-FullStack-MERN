const express = require('express');
const AdminRouter = express.Router();

AdminRouter.get("/", (req, res, next) => {
  res.render('admin', { pageTitle: 'Admin Panel' });

});

AdminRouter.get("/add-book", (req, res, next) => {
  console.log('i am in get ')
  res.render('addminADD', { pageTitle: "Admin | add book" })
});
AdminRouter.use(express.urlencoded());
const addedBooks = [];
AdminRouter.post("/add-book", (req, res, next) => {
  console.log(req.body);
  addedBooks.push(req.body);
  res.render('ADDsuccess', { pageTitle: "Admin | add book" });
})
  
module.exports = { AdminRouter, addedBooks };