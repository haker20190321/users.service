'use strict';

const tableName = 'rolesRights';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
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
      queryInterface.addIndex(tableName, {fields: ['rightId']}),
      queryInterface.addConstraint(tableName, ['roleId', 'rightId'], {type: 'unique'}),
      queryInterface.addConstraint(tableName, ['roleId'], {
        type: 'foreign key',
        references: {
          table: 'roles',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint(tableName, ['rightId'], {
        type: 'foreign key',
        references: {
          table: 'rights',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};