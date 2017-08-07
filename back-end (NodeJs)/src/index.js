'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const db = require('./server/config/db.js');
const env = require('./server/config/env');
const router = require('./server/router/index');
const util = require('./server/config/util');

const app = express();
const PORT = env.PORT;

require('./server/config/passport')(db, passport);

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true})); // Throws bad request
app.use(session({secret: 'thenodejssimplecrud',
                 cookie: { maxAge: 60000 },
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// Attach common utility functions to app
app.util = util;

router(app, db, passport);

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Express listening on port:', PORT);
  });
});