const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "userId",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relationship: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Contact;