module.exports = function(sequelize, Sequelize) {
     var addresses = sequelize.define('addresses', {
          id: {
            type: Sequelize.UUID,
            primaryKey: true
          },
          street: {
            type: Sequelize.STRING,
            allowNull: true
          },
          city: {
            type: Sequelize.STRING,
             allowNull: true
          },
          state: {
            type: Sequelize.STRING,
             allowNull: true
          },
          country: {
             type: Sequelize.STRING,
              allowNull: true
          },
          zip: {
             type: Sequelize.STRING,
              allowNull: true
          },
          account_id: {
             type: Sequelize.UUID,
             allowNull: false
          },
          type: {
            type: Sequelize.ENUM,
            values: ['COMPANY', 'PERSONAL']
          },
          phone: {
              type: Sequelize.STRING,
               allowNull: true
          },
        });

        return addresses;
}