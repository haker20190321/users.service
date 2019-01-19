'use strict';

const tableName = 'Rights';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    }
  })
    .then(() => Promise.all([
      queryInterface.addIndex(tableName, {fields: ['name']}),
      queryInterface.addIndex(tableName, {fields: ['title']})
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};