exports.error = (req, res, next) => {
  res
    .status(404)
    .render("store/404", {
      pageTitle: "Page Not Found",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
};
