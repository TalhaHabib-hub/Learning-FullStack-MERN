exports.addHome = (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb'});
}

const registeredHomes = [];

exports.addHomePost =  (req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);
  registeredHomes.push(req.body);
  res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
}

exports.home = (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
}