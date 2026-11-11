const { homes } = require("../models/appModel.js");
const { Favourite } = require("../models/favouriteMode.js");
exports.addHome = (req, res, next) => {
  res.render("admin/addHome", { pageTitle: "Add Home to airbnb" ,state:false});
};

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, url } = req.body;
  const newHome = new homes(houseName, location, price, url);
  newHome.save();
  res.render("admin/homeAdded", { pageTitle: "Home Added Successfully" });
};

exports.home = (req, res, next) => {
  homes.fetchAll((homesFor) => {
    res.render("store/home", {
      registeredHomes: homesFor,
      pageTitle: "airbnb Home",
    });
  });
};

exports.admin = (req, res, next) => {
  res.render("admin/dashboard", { pageTitle: "Admin Dashboard" });
};

exports.homeListadmin = (req, res, next) => {
  homes.fetchAll((homesFor) => {
    res.render("admin/adminHomeList", {
      registeredHomes: homesFor,
      pageTitle: "View Home List",
    });
  });
};

exports.edit = (req, res, next) => {
  const homeId = req.param.Id;
  const state = req.query.edit;
  homes.fetchAll((homesFor) => {
    res.render("admin/addHome", {
      state: state,
      pageTitle: "Edit Home",
    });
  });
};

exports.store = (req, res, next) => {
  res.render("store/storeDashboard", { pageTitle: "Store Page" });
};
exports.booking = (req, res, next) => {
  res.render("store/booking", { pageTitle: "booking Page" });
};
exports.favorites = (req, res, next) => {
  Favourite.getfavouriteHomes((favouriteHomesid) => {// 363
    homes.fetchAll((registeredHomes) => { //compelet homes data
      const favouriteHomes = registeredHomes.filter((each) => {
        return favouriteHomesid.includes(each.id);
      });
      console.log(favouriteHomes);
      res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
        pageTitle: "Favorite Home List",
            });
      });
    
    });
  }

exports.Postfavorites = (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  Favourite.addToFavourite(id, (error) => {
    if (error) {
      console.error("Error adding home to favourites:", error);
      res.status(500).send("Error adding home to favourites");
    } else {
      res.redirect("/store/favorites");
    }
  });
};

exports.homeDetails = (req, res, next) => {
  const homeId = req.params.homeId; // this will get the id
  homes.findById(homeId, (homeFound) => {
    if (homeFound) {
      res.render("store/home-detail", {
        home: homeFound,
        pageTitle: "Home Details",
      });
    } else {
      res.redirect("/");
    }
  });
};
exports.homesList = (req, res, next) => {
  res.render("store/homeList", { pageTitle: "Home List" });
};
exports.reservations = (req, res, next) => {
  res.render("store/reserver", { pageTitle: "Reservations Page" });
};
