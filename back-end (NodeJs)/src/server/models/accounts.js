module.exports = function(sequelize, Sequelize) {
    var accounts = sequelize.define('accounts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
          type: Sequelize.ENUM,
          values: ['COMPANY', 'PERSONAL']
        }
    });

    return accounts;
}