'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersHierarchy = sequelize.define('UsersHierarchy', {
    head: {
      type: DataTypes.INTEGER
    },
    under: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'usersHierarchy'
  });

  UsersHierarchy.associate = function() {
    // associations can be defined here
  };

  return UsersHierarchy;
};