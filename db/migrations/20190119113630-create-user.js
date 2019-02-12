'use strict';

const tableName = 'users';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    positionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  })
    .then(() => Promise.all([
      queryInterface.addIndex(tableName, {fields: ['firstName', 'lastName', 'middleName']}),
      queryInterface.addIndex(tableName, {fields: ['deletedAt']}),
      queryInterface.addIndex(tableName, {fields: ['createdAt']}),
      queryInterface.addIndex(tableName, {fields: ['isActive']}),
      queryInterface.addIndex(tableName, {fields: ['login']}),
      queryInterface.addConstraint(tableName, ['positionId'], {
        type: 'foreign key',
        references: {
          table: 'positions',
          field: 'id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      })
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};