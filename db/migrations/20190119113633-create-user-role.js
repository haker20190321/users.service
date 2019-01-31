'use strict';

const tableName = 'usersRoles';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
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
    .then(() => Promise.all([
      queryInterface.addIndex(tableName, {fields: ['userId']}),
      queryInterface.addIndex(tableName, {fields: ['roleId']}),
      queryInterface.addConstraint(tableName, ['userId'], {
        type: 'foreign key',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint(tableName, ['roleId'], {
        type: 'foreign key',
        references: {
          table: 'roles',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};