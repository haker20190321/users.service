'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoleRight = sequelize.define('RoleRight', {
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

  RoleRight.removeAttribute('id');

  RoleRight.associate = function() {
    // associations can be defined here
  };

  return RoleRight;
};