'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departmentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'positions'
  });

  Position.associate = function() {
    // associations can be defined here
  };

  return Position;
};