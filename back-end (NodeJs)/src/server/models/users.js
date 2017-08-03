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
      account_id: {
                   type: Sequelize.UUID,
                   allowNull: false
                }
    });

    return users;
}