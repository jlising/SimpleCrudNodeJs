'use strict';

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(db, passport) {
	passport.serializeUser(function(user, done){
    		done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        db.users.findOne({where: {id: id}})
        .then((user) => {
             done(null, user);
        }).catch(function(error){
              return done(error);
       });
    });

    passport.use('local-login', new LocalStrategy({
                                                      usernameField: 'email',
                                                      passwordField: 'password',
                                                      passReqToCallback : true
                                                  },
        function(req, email, password, done) {
            process.nextTick(function(){
                 db.users.findOne({where: {email: email}}).then(user => {
                        if(user){
                             if (!user.validatePassword(password)) {
                                return done(null, false, { message: 'Incorrect password.' });
                             }else{
                                return done(null, user);
                             }
                        }else{
                            return done(null, false, { message: 'Incorrect username.' });
                        }
                 }).catch(function(error){
                        return done(error);
                 });
             });
        }));

    passport.use(new FacebookStrategy({
            clientID: '461790384160502',
            clientSecret: '4a7a88168bb7e6c365a29550c029bcf5',
            callbackURL: 'http://localhost:9090/auth/facebook/callback',
            profileFields: ['emails' , 'name', 'photos']
          },
          function(accessToken, refreshToken, profile, done) {
          console.log(profile);
                    db.users.findOne({where: {email: profile.emails[0].value}}).then(user => {
                            if(user){

                            }else{
                                // Add user
                                return done(null, user);
                            }
                     }).catch(function(error){
                            return done(error);
                     });
            }
        ));
}