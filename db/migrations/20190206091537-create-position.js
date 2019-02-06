'use strict';

const tableName = 'positions';

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
    },
    departmentId: {
      type: Sequelize.INTEGER
    }
  })
    .then(() => Promise.all([
      queryInterface.addIndex(tableName, {fields: ['name']}),
      queryInterface.addConstraint(tableName, ['name'], {type: 'unique'}),
      queryInterface.addConstraint(tableName, ['departmentId'], {
        type: 'foreign key',
        references: {
          table: 'departments',
          field: 'id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      })
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};