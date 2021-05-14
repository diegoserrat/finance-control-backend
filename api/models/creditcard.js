'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreditCard extends Model {
    static associate(models) {
      CreditCard.hasMany(models.Debit, {foreignKey: 'credit_card_id'});
      CreditCard.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'});
    }
  };
  CreditCard.init({
    name: DataTypes.STRING,
    bank: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CreditCard',
  });
  return CreditCard;
};