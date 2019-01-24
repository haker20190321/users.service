'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rights = sequelize.define('Right', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'rights'
  });
  Rights.associate = function() {
    // associations can be defined here
  };
  return Rights;
};