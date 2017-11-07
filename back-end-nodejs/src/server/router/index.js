'use strict'

const routes = [
  require('./routes/common'), require('./routes/accounts'), require('./routes/users')
];

// Add access to the app and db objects to each route
module.exports = function router(app, db, passport) {
  return routes.forEach((route) => {
    route(app, db, passport);
  });
};