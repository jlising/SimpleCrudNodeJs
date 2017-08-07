'use strict';

module.exports = (app, db, passport) => {
   app.post('/auth/login', passport.authenticate('local-login'),
      function(req, res) {
         console.log(req.user.username);
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user);
      });

   app.get('/auth/logout', (req, res, next) => {
        req.logout();
        req.session.destroy();
        delete req.session;
        res.json("Logged out");
   });
};

