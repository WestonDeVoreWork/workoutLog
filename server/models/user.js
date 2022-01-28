const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // owner_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }
});

module.exports = User;