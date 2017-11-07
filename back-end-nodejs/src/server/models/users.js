var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, Sequelize) {
    var users = sequelize.define('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      fname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mname: {
              type: Sequelize.STRING,
              allowNull: true
      },
      lname: {
                    type: Sequelize.STRING,
                    allowNull: false
      },
      email: {
                          type: Sequelize.STRING,
                          allowNull: false
            },
      password:{
                     type: Sequelize.STRING,
                     allowNull: true
             },
      account_id: {
                   type: Sequelize.UUID,
                   allowNull: false
                }
      });

      users.prototype.generateHash = function(password){
      	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
      }

      users.prototype.validatePassword = function(password) {
         //return bcrypt.compareSync(password, this.password);
         return this.password == password;
      };
    return users;
}