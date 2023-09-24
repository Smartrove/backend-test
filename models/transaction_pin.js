'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Pin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction_Pin.init({
    user_id: DataTypes.INTEGER,
    pin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction_Pin',
  });
  return Transaction_Pin;
};