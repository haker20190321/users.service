'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    positionId: {
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        return toISOString(this, 'createdAt');
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        return toISOString(this, 'updatedAt');
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      get() {
        return toISOString(this, 'deletedAt');
      }
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'users'
  });

  User.associate = function(Models) {
    User.belongsToMany(Models.Role, {
      through: Models.UserRole,
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'roles'
    });
  };

  return User;
};

/**
 * If field of model is instance of Date returning field.toISOString()
 *
 * @param {Object} model
 * @param {string} field
 * @return {any}
 */
const toISOString = (model, field) => {
  const val = model.getDataValue(field);

  return val instanceof Date ? val.toISOString() : val;
};