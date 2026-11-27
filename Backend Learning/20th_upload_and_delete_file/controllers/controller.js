const homes = require("../models/appModel.js");

const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

exports.addHome = (req, res, next) => {
  res.render("admin/addHome", {
    pageTitle: "Add Home to airbnb",
    isLoggedIn: req.session.isLoggedIn,
    user:req.session.user,
    state: false,
  });
};

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, photo, description } = req.body;
  console.log(houseName, location, price, photo, description);
  const newHome = new homes({ houseName, location, price, photo, description });
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
      user:req.session.user,
    });
  });
};

exports.editHomePost = (req, res, next) => {
  const { id, houseName, location, price, photo, description } = req.body;
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
        home.photo = photo;
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
    user:req.session.user,
  });
};

exports.homeListadmin = (req, res, next) => {
  homes.find().then((registeredHomes) => {
    res.render("admin/adminHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "View Home List",
      isLoggedIn: req.session.isLoggedIn,
      user:req.session.user,
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
        user:req.session.user,
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

exports.favHomeDelete = async (req, res, next) => {
  const homeId = req.params.id;
  const user_id =await req.session.user.id;
  const user = await User.findById(user_id).populate('favourites');
  
  user.favourites =user.favourites.filter((each) => each._id.toString() !== homeId);
  
 await user.save();
  res.redirect('/store/favorites');
  
  console.log(user);
};
// exports.favHomeDelete = async (req, res, next) => {
//   const homeId = req.params.id;
//   const user = await User.findById(req.session.user.id);

//   if (!user) return next();

//   user.favourites = user.favourites.filter(
//     favouriteId => favouriteId.toString() !== homeId
//   );

//   await user.save();
//   res.redirect("/store/favorites");
// };

exports.store = (req, res, next) => {
  res.render("store/storeDashboard", {
    pageTitle: "Store Page",
    isLoggedIn: req.session.isLoggedIn,
    user:req.session.user,
  });
};
exports.booking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "booking Page",
    isLoggedIn: req.session.isLoggedIn,
    user:req.session.user,
  });
};

exports.favorites = async (req, res, next) => {
  // console.log(req.session.user.populate('favourites'));
  const userId = req.session.user.id;
  const user = await User.findById(userId).populate('favourites');
 
  /*.populate('favourites') tells Mongoose to replace the IDs in the user’s favourites array with the corresponding home documents from the homes collection. That works because the favourites field is defined with ref: 'homes' in userModel.js.*/
      res.render("store/favourite-list", {
        favouriteHomes: user.favourites,
        pageTitle: "Favorite Home List",
        isLoggedIn: req.session.isLoggedIn,
        user:req.session.user,
      });
    
};

exports.Postfavorites = async (req, res, next) => {
  const id = req.body.id;
  const userId = await req.session.user.id;
  const user = await User.findById(userId);
  console.log('user', user);
  if (!user.favourites.includes(id)) {
    user.favourites.push(id);
    await user.save();
  }
  res.redirect('/store/favorites');
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
        user:req.session.user,
      });
    })
    .catch(next);
};
exports.homesList = (req, res, next) => {
  res.render("store/homeList", {
    pageTitle: "Home List",
    isLoggedIn: req.session.isLoggedIn,
    user:req.session.user,
  });
};
exports.reservations = (req, res, next) => {
  res.render("store/reserver", {
    pageTitle: "Reservations Page",
    isLoggedIn: req.session.isLoggedIn,
    user:req.session.user,
  });
};
// login
exports.loginAction = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    isLoggedIn: req.session.isLoggedIn,
    user:req.session.user,
    errors: null,
  });
};
exports.loginSubmit = async (req, res, next) => {
  // req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn" , true);
  // req.session.isLoggedIn = true;
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });// this is data base call so it would promise so we will await
  if (!user) {
    return res.status(422).render('auth/login', {
      pageTitle: "login",
      isLoggedIn: req.session.isLoggedIn,
      user:req.session.user,
      errors: ["email doesn't exits"],
      oldInput:{email:email},//can just write email
    })
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(422).render('auth/login', {
      pageTitle: "login",
      isLoggedIn: req.session.isLoggedIn,
      user:req.session.user,
      errors: ["Invalid credentials"],
      oldInput:{email:email},//can just write email
    })
  }

 req.session.isLoggedIn = true;
 req.session.user = {
  id: user._id.toString(),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  userType: user.userType,
};

 req.session.save((err) => {
  if (err) return next(err);
  res.redirect("/");
});
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
    user:req.session.user,
    errors: null,
  });
};

exports.postsignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("first name should be atleast 2 Characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("first name should only contain alphabets"),

  check("lastName")
    .matches(/^[A-Za-z]+$/)
    .withMessage("last name should only contain alphabets"),

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
      return true; //validation passed
    }),

  check("userType")
    .notEmpty()
    .withMessage("please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalide user type"),

  check("terms")
    .notEmpty()
    .withMessage("please accept the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("please accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
      userType,
      confirmPassword,
      terms,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: req.session.isLoggedIn,
        user:req.session.user,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
          confirmPassword,
          terms,
        },
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save(); // this is promise
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          isLoggedIn: req.session.isLoggedIn,
          user:req.session.user,
          errors: [err.message],
          oldInput: {
            firstName,
            lastName,
            email,
            password,
            userType,
            confirmPassword,
            terms,
          },
        });
      });
  },
];
