'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'UserRoles'
  });
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};