'use strict';

const tableName = 'RoleRights';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
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
    .then(() => Promise.all([
      queryInterface.addIndex(tableName, {fields: ['roleId']}),
      queryInterface.addIndex(tableName, {fields: ['rightId']})
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};