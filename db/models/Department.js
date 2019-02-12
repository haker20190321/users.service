'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'departments'
  });

  Department.associate = function() {
    // associations can be defined here
  };

  return Department;
};