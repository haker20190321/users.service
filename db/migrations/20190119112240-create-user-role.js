'use strict';

const tableName = 'UserRoles';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
      .then(() => {
        return Promise.all([
          queryInterface.addIndex(tableName, {fields: ['userId']}),
          queryInterface.addIndex(tableName, {fields: ['roleId']}),
        ])
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};