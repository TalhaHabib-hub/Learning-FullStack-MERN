exports.addHome = (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb'});
}
const { registeredHomes } = require('../models/appModel.js');
const {homes} = require('../models/appModel.js');

exports.addHomePost = (req, res, next) => {
  const { houseName, location, price, url } = req.body;
  const newHome = new homes(houseName, location, price, url );
  newHome.save();
  res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
}

exports.home = (req, res, next) => {
  homes.fetchAll((homesFor) => {
    console.log('homes', homesFor);
    res.render('home', {
      registeredHomes: homesFor,
      pageTitle: 'airbnb Home'
    });
  });
}