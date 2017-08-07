'use strict'

const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    timestamps: false,
    underscored: true // use underscored format in FKEY
  }
});

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.accounts = require('../models/accounts')(sequelize, Sequelize);
db.addresses = require('../models/addresses')(sequelize, Sequelize);
db.users = require('../models/users')(sequelize, Sequelize);

// Associations
db.accounts.hasMany(db.addresses);//{as: 'address'}
db.accounts.hasMany(db.users);
db.users.belongsTo(db.accounts);

module.exports = db;