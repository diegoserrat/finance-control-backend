'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debit extends Model {
    static associate(models) {
      Debit.belongsTo(models.CreditCard,{ foreignKey: 'credit_card_id' , as: 'creditCard' });
      Debit.belongsTo(models.DebitType, {foreignKey: 'debit_type_id' , as: 'debitType'});
    }
  };
  Debit.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    month: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Debit',
  });
  return Debit;
};