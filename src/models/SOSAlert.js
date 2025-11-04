//test models file
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
const SOSAlert = sequelize.define("SOSAlert", {
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
   message: {
    type: DataTypes.STRING,
    defaultValue: "SOS Emergency",
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  long: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: true,
});
export default SOSAlert;
