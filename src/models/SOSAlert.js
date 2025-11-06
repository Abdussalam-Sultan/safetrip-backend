//test models file
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
const SOSAlert = sequelize.define("SOSAlert", {
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_UUID: {                           
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',                     
      key: 'user_UUID',                 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
   message: {
    type: DataTypes.STRING,
    defaultValue: "SOS Emergency",
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type:DataTypes.ENUM("active", "inactive", "suspended"), 
    allowNull:false, 
    defaultValue: "active",
  },
  severityLevel: {
    type:DataTypes.ENUM("high", "medium", "low"),
    allowNull: true,
    defaultValue: "high"
  }
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: true,
});
export default SOSAlert;
