// /// this function will be used to protect routes//////
exports.isAuth = async (req, res, next) => {
  if (req.session && req.session.isAuth) {
    next();
  } else {
    res.redirect('/loginPage');
  }
};
