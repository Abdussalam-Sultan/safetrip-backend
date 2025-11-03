//test models file
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
const SOSAlert = sequelize.define("SOSAlert", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  message: {    
    type: DataTypes.STRING,
    defaultValue: "Help needed!",
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
