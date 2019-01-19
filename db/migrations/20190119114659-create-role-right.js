'use strict';

const tableName = 'RoleRights';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rightId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
      .then(() => {
        return Promise.all([
          queryInterface.addIndex(tableName, {fields: ['roleId']}),
          queryInterface.addIndex(tableName, {fields: ['rightId']}),
        ])
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};