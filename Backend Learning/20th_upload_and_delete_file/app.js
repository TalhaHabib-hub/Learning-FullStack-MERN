

// dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const multer = require('multer');

const storeRouter = require("./routes/storeRouter");
const { adminRouter } = require("./routes/adminRouter");
const { authRouter } = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const { error } = require("./controllers/errorController");

const MONGO_URL =
  "mongodb+srv://talhahabib842653_db_user:842653574159@cluster0.btizmj9.mongodb.net/airbnb";

const app = express();

const Store = mongodbStore({
  uri: MONGO_URL,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");


const randomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOptions = {
  storage,
  fileFilter,
}

const storageMult = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});



// these below are things for requst handling and file handling 
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));
app.use(multer(multerOptions).single('photo'));//
app.use(
  session({
    // Secret key used to sign the session ID cookie and encrypt session data
    secret: "Talha Habib Jughooru",
    //Forces session to saved back to the session store, even if not modified
    resave: false,
    //Forces a session that is "uninitialized" to be saved to the store
    saveUninitialized: true,

    store: Store,
  }),
);

// app.use((req, res, next) => {
//   console.log("in the request cookie ", req.get("Cookie"));
//   // req.session.isLoggedIn = req.get("Cookie") ? req.get('Cookie').split("=")[1] === 'true' : false;
//   req.session.isLoggedIn = req.session.isLoggedIn;
//   next();
// });
app.use(authRouter);
app.use(storeRouter);
app.use("/admin", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
});
app.use(adminRouter);

app.use(error);

const PORT = 3000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
