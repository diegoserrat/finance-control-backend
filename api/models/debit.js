'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debit extends Model {
    static associate(models) {
      Debit.belongsTo(models.CreditCard,{ foreignKey: 'credit_card_id' });
      Debit.belongsTo(models.DebitType, {foreignKey: 'debit_type_id'});
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