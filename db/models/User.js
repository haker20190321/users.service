'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'Users'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};