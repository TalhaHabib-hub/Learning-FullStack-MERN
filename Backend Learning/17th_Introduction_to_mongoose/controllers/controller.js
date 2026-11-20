const homes = require('../models/appModel.js')
const Favourite  = require("../models/favouriteMode.js");

exports.addHome = (req, res, next) => {
  res.render("admin/addHome", {
    pageTitle: "Add Home to airbnb",
    state: false,
  });
};

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, url, description } = req.body;
  const newHome = new homes({houseName, location, price, url, description});
  newHome.save().then(() => {
    console.log("home saved successfully");
  });
  res.redirect("/");
};

exports.home = (req, res, next) => {
  homes.find().then((homes) => {
    res.render("store/home", {
      pageTitle: "Air bnb home",
      registeredHomes: homes,
    state: false,
  });
  })
};



exports.editHomePost = (req, res, next) => {

  const { id, houseName, location, price, url, description } = req.body;
  homes.findById(id).then(home => {
    if (!home) {
      console.log('home not found ');
      return res.redirect("/store/")
    } else {
      home.houseName = houseName;
      home.location = location;
      home.price = price;
      home.url = url;
      home.description = description;
      home.save().then(() => {
        console.log('home edited successfully!');
      }).catch ((err) => {
        console.log('unable to edit home', err);
      });
    }
  }).catch(() => {
    console.log('error while editing home');
  }).finally(() => {
    res.redirect('/');
  })

};

exports.admin = (req, res, next) => {
  res.render("admin/dashboard", { pageTitle: "Admin Dashboard" });
};

exports.homeListadmin = (req, res, next) => {
  homes.find().then((registeredHomes) => {
    res.render("admin/adminHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "View Home List",
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
  Favourite.findOneAndDelete({ homeID: homeId }).then((result) => {
    console.log('home deleted successfully')
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    res.redirect('/store/favorites')
  })
};

exports.store = (req, res, next) => {
  res.render("store/storeDashboard", { pageTitle: "Store Page" });
};
exports.booking = (req, res, next) => {
  res.render("store/booking", { pageTitle: "booking Page" });
};

exports.favorites = (req, res, next) => {
  Favourite.find().populate('homeID').then((favourites) => {
    const favouriteHomes = favourites.map(fav => fav.homeID);
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "Favorite Home List",
    });
  })
};

exports.Postfavorites = (req, res, next) => {
  const id = req.body.id;
  Favourite.findOne({ homeID: id }).then(existing => {
    if (!existing) {
      const fav = new Favourite({ homeID: id });
      return fav.save().then(() => {
        console.log('fav home added');
      }).catch((err) =>{
      console.log('problem while adding to fav',err)});
    }
  }).then(() => {
    res.redirect('/store/favorites')
  }).catch(err => {
    console.log(' home finding problem among fave',err);
    
  })
};
exports.homeDetails = (req, res, next) => {
  const homeId = req.params.homeId; // this will get the id
  homes.findById(homeId).then((home) => {
    if (home) {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
      });
    } else {
      console.log("home not found");
      res.redirect("/admin/home-list");
    }
  });
};
exports.homesList = (req, res, next) => {
  res.render("store/homeList", { pageTitle: "Home List" });
};
exports.reservations = (req, res, next) => {
  res.render("store/reserver", { pageTitle: "Reservations Page" });
};
