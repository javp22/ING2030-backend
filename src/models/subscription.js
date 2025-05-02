'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Subscription.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    company: DataTypes.STRING,
    category: DataTypes.STRING,
    billingCycle: DataTypes.STRING,
    nextBillingDate: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};