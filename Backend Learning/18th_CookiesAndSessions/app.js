const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');

const storeRouter = require("./routes/storeRouter");
const { adminRouter } = require("./routes/adminRouter");
const { authRouter } = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const { error } = require("./controllers/errorController");





const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));


app.use((req, res, next) => 
{
console.log('in the request cookie ', req.get('Cookie'));
  req.isLoggedIn = req.get("Cookie") ? req.get('Cookie').split("=")[1] === 'true' : false;
  next();
})
app.use(authRouter);
app.use(storeRouter);
app.use('/admin', (req, res, next) => {
  if (!req.isLoggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
})
app.get('/logout', (req, res, next) => {
  // req.isLoggedIn = false;
  res.clearCookie("isLoggedIn");
  res.redirect('/');
  // next();
})
app.use(adminRouter);

app.use(error);

const PORT = 3000;

const MONGO_URL = "mongodb+srv://talhahabib842653_db_user:842653574159@cluster0.btizmj9.mongodb.net/airbnb";
mongoose.connect(MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log('MongoDB connection failed', err);
});

