// //////function to create session for user auth//////
exports.createSession = function (req, res, next) {
  req.session.user = 'myUser';
  req.session.isAuth = true;
  req.session.role = 'user';
  next();
};

// /// this function will be used to protect routes//////
exports.isAuth = async (req, res, next) => {
  if (req.session && req.session.isAuth) {
    next();
  } else {
    res.send('you are not authorised');
  }
};
