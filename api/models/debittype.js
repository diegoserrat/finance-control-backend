'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DebitType extends Model {
    static associate(models) {
      DebitType.hasMany(models.Debit,{ foreignKey: 'debit_type_id' })
      DebitType.hasMany(models.DebitsHome,{ foreignKey: 'debit_type_id' })
    }
  };
  DebitType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DebitType',
  });
  return DebitType;
};