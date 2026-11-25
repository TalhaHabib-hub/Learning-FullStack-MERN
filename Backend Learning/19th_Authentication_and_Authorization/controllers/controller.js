const homes = require("../models/appModel.js");
const Favourite = require("../models/favouriteMode.js");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

exports.addHome = (req, res, next) => {
  res.render("admin/addHome", {
    pageTitle: "Add Home to airbnb",
    isLoggedIn: req.session.isLoggedIn,
    state: false,
  });
};

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, url, description } = req.body;
  const newHome = new homes({ houseName, location, price, url, description });
  newHome.save().then(() => {
    console.log("home saved successfully");
  });
  res.redirect("/");
};

exports.home = (req, res, next) => {
  homes.find().then((homes) => {
    console.log(req.session.isLoggedIn);
    res.render("store/home", {
      pageTitle: "Air bnb home",
      registeredHomes: homes,
      state: false,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.editHomePost = (req, res, next) => {
  const { id, houseName, location, price, url, description } = req.body;
  homes
    .findById(id)
    .then((home) => {
      if (!home) {
        console.log("home not found ");
        return res.redirect("/store/");
      } else {
        home.houseName = houseName;
        home.location = location;
        home.price = price;
        home.url = url;
        home.description = description;
        home
          .save()
          .then(() => {
            console.log("home edited successfully!");
          })
          .catch((err) => {
            console.log("unable to edit home", err);
          });
      }
    })
    .catch(() => {
      console.log("error while editing home");
    })
    .finally(() => {
      res.redirect("/");
    });
};

exports.admin = (req, res, next) => {
  res.render("admin/dashboard", {
    pageTitle: "Admin Dashboard",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.homeListadmin = (req, res, next) => {
  homes.find().then((registeredHomes) => {
    res.render("admin/adminHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "View Home List",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id;
  const state = req.query.edit === "true";
  homes.findById(id).then((home) => {
    if (!home) {
      console.log("home not found..!");
      return res.redirect("/admin/home-list");
    } else {
      res.render("admin/addHome", {
        home: home,
        state: state,
        pageTitle: "Edit Home",
        isLoggedIn: req.session.isLoggedIn,
      });
    }
  });
};
exports.deleteHome = (req, res, next) => {
  const homeId = req.params.id;
  homes.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found..!");
      return res.redirect("/admin/home-list");
    } else {
      homes
        .findByIdAndDelete(homeId)
        .then(() => {
          res.redirect("/admin/home-list");
        })
        .catch((error) => {
          console.log("erro happend while deleting from database.!", error);
        });
    }
  });
};

exports.favHomeDelete = (req, res, next) => {
  const homeId = req.params.id;
  Favourite.findOneAndDelete({ homeID: homeId })
    .then((result) => {
      console.log("home deleted successfully");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      res.redirect("/store/favorites");
    });
};

exports.store = (req, res, next) => {
  res.render("store/storeDashboard", {
    pageTitle: "Store Page",
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.booking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "booking Page",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.favorites = (req, res, next) => {
  Favourite.find()
    .populate("homeID")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.homeID);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Favorite Home List",
        isLoggedIn: req.session.isLoggedIn,
      });
    });
};

exports.Postfavorites = (req, res, next) => {
  const id = req.body.id;
  Favourite.findOne({ homeID: id })
    .then((existing) => {
      if (!existing) {
        const fav = new Favourite({ homeID: id });
        return fav
          .save()
          .then(() => {
            console.log("fav home added");
          })
          .catch((err) => {
            console.log("problem while adding to fav", err);
          });
      }
    })
    .then(() => {
      res.redirect("/store/favorites");
    })
    .catch((err) => {
      console.log(" home finding problem among fave", err);
    });
};
exports.homeDetails = (req, res, next) => {
  const homeId = req.params.homeId; // this will get the id

  if (!mongoose.Types.ObjectId.isValid(homeId)) {
    return next();
  }

  homes
    .findById(homeId)
    .then((home) => {
      if (!home) {
        return next();
      }

      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch(next);
};
exports.homesList = (req, res, next) => {
  res.render("store/homeList", {
    pageTitle: "Home List",
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.reservations = (req, res, next) => {
  res.render("store/reserver", {
    pageTitle: "Reservations Page",
    isLoggedIn: req.session.isLoggedIn,
  });
};
// login
exports.loginAction = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.loginSubmit = (req, res, next) => {
  // req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn" , true);
  req.session.isLoggedIn = true;
  res.redirect("/");
};
exports.postlogout = (req, res, next) => {
  // req.session.isLoggedIn = false;
  // res.cookie("isLoggedIn",false);
  // req.session.session.isLoggedIn = false;
  // res.redirect('/');

  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      return res.status(500).send("Could not log out");
    }

    // Critical: Clear the cookie on the client side
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });

  // next();
};

exports.getsignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "singup",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postsignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("first name should be atleast 2 Characters long")
    .matches(/^[A-Za-z]*s/)
    .withMessage("first name should only contain 2 alphabets"),

  check("lastName")
    .matches(/^[A-Za-z]*s/)
    .withMessage("last name should only contain 2 alphabets"),

  check("email")
    .isEmail()
    .withMessage("please enter valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("password should contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("password should contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("password should contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>_\-=+[\]\\;/`~]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;//validation passed
    }),
  
  check('userType')
    .notEmpty()
    .withMessage('please select a user type')
    .isIn(['guest', 'host'])
    .withMessage('Invalide user type'),
  
  check('terms')
    .notEmpty()
    .withMessage('please accept the terms and conditions')
    .custom((value, { req })=> {
      if (value !== 'on') {
        throw new Error('please accept the terms and conditions');
      }
      return true;
    }),
  
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: req.session.isLoggedIn,
        errors: errors.array().map(err => err.msg),
        oldInput:{firstName,lastName,email,password, userType},
      })
    }
  res.redirect('/login');
},

];
