'use strict';

const tableName = 'departments';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    }
  })
    .then(() => Promise.all([
      queryInterface.addIndex(tableName, {fields: ['name']}),
      queryInterface.addConstraint(tableName, ['name'], {type: 'unique'})
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};