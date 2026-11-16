const { homes } = require("../models/appModel.js");
const { Favourite } = require("../models/favouriteMode.js");

exports.addHome = (req, res, next) => {
  res.render("admin/addHome", {
    pageTitle: "Add Home to airbnb",
    state: false,
  });
};

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, url,description } = req.body;
  const newHome = new homes(houseName, location, price, url,description);
  newHome.save();
  res.redirect("/");
};

exports.editHomePost = (req, res, next) => {
  const { id, houseName, location, price, url ,description} = req.body;
  const newHome = new homes(houseName, location, price, url,description,id);
  newHome.save();
  res.redirect("/admin/home-list");
};

exports.home = (req, res, next) => {
  homes.fetchAll().then(([registeredHomes]) => {
   res.render("store/home", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
      });
  });
};

exports.admin = (req, res, next) => {
  res.render("admin/dashboard", { pageTitle: "Admin Dashboard" });
};

exports.homeListadmin = (req, res, next) => {
  homes.fetchAll().then(([registeredHomes]) => {
    res.render("admin/adminHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "View Home List",
    });
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id;
  const state = req.query.edit === "true";
  homes.findById(id).then(([rows]) => {
   const home = rows[0];
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
  homes.findById(homeId).then(([rows]) => {
    const home = rows[0];
    if (!home) {
      console.log("home not found..!");
      return res.redirect("/admin/home-list");
    } else {
      homes.deleteHomefunction(homeId).then(() => {
              res.redirect("/admin/home-list");
      }).catch((error) => {
        console.log('erro happend while deleting from database.!',error);
    });
    }
  });
};

exports.favHomeDelete = (req, res, next) => {
  const homeId = req.params.id;
  console.log("talha ", homeId);
  Favourite.removefromfavorite(homeId, (err) => {
    if (!err) {
      return res.redirect("/store/favorites");
    } else {
      console.log("error happend while adding to favorite ", err);
    }
  });
};

exports.store = (req, res, next) => {
  res.render("store/storeDashboard", { pageTitle: "Store Page" });
};
exports.booking = (req, res, next) => {
  res.render("store/booking", { pageTitle: "booking Page" });
};

exports.favorites = (req, res, next) => {
  Favourite.getfavouriteHomes((favouriteHomesid) => {
    // 363
    homes.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((each) => {
        return favouriteHomesid.includes(each.id);
      });
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Favorite Home List",
      });
    });
  });
};

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
  homes.findById(homeId).then(([rows]) => {
    const homeFound = rows[0];
    if (homeFound) {
      res.render("store/home-detail", {
        home: homeFound,
        pageTitle: "Home Details",
      });
    } else {
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
