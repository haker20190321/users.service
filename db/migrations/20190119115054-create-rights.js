'use strict';

const tableName = 'Rights';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
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
      .then(() => {
        return Promise.all([
          queryInterface.addIndex(tableName, {fields: ['name']}),
          queryInterface.addIndex(tableName, {fields: ['title']})
        ])
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};