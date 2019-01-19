'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoleRight = sequelize.define('RoleRight', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    roleId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    rightId: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'RoleRights'
  });
  RoleRight.associate = function(models) {
    // associations can be defined here
  };
  return RoleRight;
};