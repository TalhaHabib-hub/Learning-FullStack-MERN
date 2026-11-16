exports.error = (req, res, next) => {
  res.status(404).render('store/404', {pageTitle: 'Page Not Found'});
}