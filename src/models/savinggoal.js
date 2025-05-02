'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavingGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SavingGoal.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  SavingGoal.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    targetAmount: DataTypes.FLOAT,
    currentAmount: DataTypes.FLOAT,
    period: DataTypes.STRING,
    deadline: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SavingGoal',
  });
  return SavingGoal;
};