'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'roles'
  });

  Role.associate = function(Models) {
    Role.belongsToMany(Models.Right, {
      through: Models.RoleRight,
      foreignKey: 'roleId',
      otherKey: 'rightId',
      as: 'rights'
    });
  };

  return Role;
};