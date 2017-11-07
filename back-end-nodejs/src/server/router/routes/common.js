'use strict';

module.exports = (app, db, passport) => {
   /* -- Simple way!
    app.post('/auth/login', passport.authenticate('local-login'),
      function(req, res) {
         console.log(req.user.username);
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user);
      });*/

   /**
    * Default route for ping
    */
   app.get('/auth', app.util.isRequestAuthenticated, (req, res) => {
        var response = {
            ip: req.headers['x-real-ip'] || req.connection.remoteAddress,
            date: new Date()
        };
        res.json(response);
   });

   /*
    * Process login
    */
   app.post('/auth/login', function(req, res, next) {
     passport.authenticate('local-login', function(err, user, info) {
       if (err) {
         return next(err); // will generate a 500 error
       }
       // Generate a JSON response reflecting authentication status
       if (! user) {
         res.statusMessage = "Authentication failed";
         return res.send(401,{ success : false, message : 'authentication failed' });
       }

       //Process login
       req.login(user, function(err){
         if(err){
           return next(err);
         }
         return res.send(user);
       });

     })(req, res, next);
   });

   /*
    * Logout
    */
   app.get('/auth/logout', (req, res, next) => {
        req.logout();
        req.session.destroy();
        delete req.session;
        res.json("Logged out");
   });

   // Login with facebook
   app.get('/auth/facebook',
            passport.authenticate('facebook', {scope: ['email']})
   );

   app.get('/auth/facebook/callback', function(req, res, next){
        passport.authenticate('facebook', function(err, user, info){
            if(err){
                console.log(err);
             }else{
                 console.log(user);
                 res.json(user);
             }
        })(req, res, next);
    });
};