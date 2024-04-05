const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      req.session.redirectTo = req.originalUrl;
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  