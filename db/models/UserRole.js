'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
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
    tableName: 'usersRoles',
    freezeTableName: true
  });

  UserRole.removeAttribute('id');

  UserRole.associate = function() {
    // associations can be defined here
  };

  return UserRole;
};