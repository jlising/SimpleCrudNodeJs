'use strict';

const LocalStrategy = require('passport-local').Strategy;

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
}