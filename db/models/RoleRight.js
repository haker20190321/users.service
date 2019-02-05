'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoleRight = sequelize.define('RoleRight', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rightId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'rolesRights'
  });

  RoleRight.associate = function() {
    // associations can be defined here
  };

  return RoleRight;
};