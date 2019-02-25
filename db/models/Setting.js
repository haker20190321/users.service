'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    paranoid: false,
    tableName: 'settings'
  });

  Setting.removeAttribute('id');

  Setting.associate = function() {
    // associations can be defined here
  };

  return Setting;
};