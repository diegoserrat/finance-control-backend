'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DebitsHome extends Model {
    static associate(models) {
      DebitsHome.belongsTo(models.DebitType, {foreignKey: 'debit_type_id', as: 'debitType'});
    }
  };
  DebitsHome.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    month: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DebitsHome',
  });
  return DebitsHome;
};