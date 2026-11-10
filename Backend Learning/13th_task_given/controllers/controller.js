exports.addHome = (req, res, next) => {
  res.render('admin/addHome', {pageTitle: 'Add Home to airbnb'});
}
const {homes} = require('../models/appModel.js');

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, url } = req.body;
  const newHome = new homes(houseName, location, price, url );
  newHome.save();
  res.render('admin/homeAdded', {pageTitle: 'Home Added Successfully'});
}

exports.home = (req, res, next) => {
  homes.fetchAll((homesFor) => {
    res.render('store/home', {
      registeredHomes: homesFor,
      pageTitle: 'airbnb Home'
    });
  });
}

exports.admin = (req, res, next) => {
  res.render('admin/dashboard', {pageTitle: 'Admin Dashboard'});
}

exports.homeListadmin = (req, res, next) => {
  homes.fetchAll((homesFor) => {
    res.render('admin/adminHomeList', {
      registeredHomes: homesFor,
      pageTitle: 'View Home List'
    });
  });
}

exports.editHome = (req, res, next) => {
  homes.fetchAll((homesFor) => {
    res.render('admin/edit-home', {
      registeredHomes: homesFor,
      pageTitle: 'Edit Home'
    });
  });
}


exports.store = (req, res, next) => {
  res.render('store/storeDashboard', {pageTitle: 'Store Page'});
}
exports.booking = (req, res, next) => {
  res.render('store/booking', {pageTitle: 'booking Page'});
}
exports.favorites = (req, res, next) => {
  res.render('store/favourite-list', {pageTitle: 'Favorites Page'});
}
exports.homeDetails = (req, res, next) => {
  res.render('store/home-detail', {pageTitle: 'Home Details'});
}
exports.homesList = (req, res, next) => {
  res.render('store/homeList', {pageTitle: 'Home List'});
}
exports.reservations = (req, res, next) => {
  res.render('store/reserver', {pageTitle: 'Reservations Page'});
}