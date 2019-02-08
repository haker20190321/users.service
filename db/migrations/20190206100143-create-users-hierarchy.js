'use strict';

const tableName = 'usersHierarchy';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    head: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    under: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  })
    .then(() => Promise.all([
      queryInterface.addConstraint(tableName, ['head', 'under'], {type: 'unique'}),
      queryInterface.addConstraint(tableName, ['head'], {
        type: 'foreign key',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint(tableName, ['under'], {
        type: 'foreign key',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};