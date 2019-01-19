'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'Roles'
  });
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};