'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/sequelize')[env];
const db = {};
const sequelize = new Sequelize({...config,
  operatorsAliases: Sequelize.Op.LegacyAliases, // for use deprecated operators
  logging: env === 'development' && process.env.DEBUG === '1',
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true,
    paranoid: true
  }});

Sequelize.Model.prototype.woTs = function() {
  const values = {...this.get()};

  ['createdAt', 'updatedAt', 'deletedAt'].forEach((field) => {
    if (typeof values[field] !== 'undefined') {
      delete values[field];
    }
  });

  return values;
};

Sequelize.Model.prototype.fields = function(fields = []) {
  const values = {};

  fields.forEach((field) => {
    const val = this.get(field);

    if (typeof val !== 'undefined') {
      values[field] = val;
    }
  });

  return values;
};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
