'use strict';

const tableName = 'Users';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      accountId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
      },
      login: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
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
      .then(() => {
        return Promise.all([
          queryInterface.addIndex(tableName, {fields: ['firstName', 'lastName', 'middleName']}),
          queryInterface.addIndex(tableName, {fields: ['deletedAt']}),
          queryInterface.addIndex(tableName, {fields: ['createdAt']}),
          queryInterface.addIndex(tableName, {fields: ['isActive']}),
          queryInterface.addIndex(tableName, {fields: ['accountId']}),
          queryInterface.addIndex(tableName, {fields: ['login']})
        ]);
      });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableName);
  }
};