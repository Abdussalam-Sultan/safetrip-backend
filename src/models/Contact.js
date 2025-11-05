import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Contact = sequelize.define("Contact", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_UUID: { type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'user_UUID',}, onDelete: 'CASCADE', onUpdate: 'CASCADE',},
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  relationship: { type: DataTypes.STRING, allowNull: true }
}, {
  timestamps: true
});

export default Contact;
