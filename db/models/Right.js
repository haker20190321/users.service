'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rights = sequelize.define('Right', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'Rights'
  });
  Rights.associate = function(models) {
    // associations can be defined here
  };
  return Rights;
};