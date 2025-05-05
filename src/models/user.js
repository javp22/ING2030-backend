'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: 'id',
      });
      User.hasMany(models.Subscription, {
        foreignKey: 'id',
      });
      User.hasMany(models.SavingGoal, {
        foreignKey: 'id',
      });
      User.hasMany(models.Budget, {
        foreignKey: 'id',
      });
      User.hasMany(models.Alert, {
        foreignKey: 'id',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    budget: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    spent: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};