import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Tip = sequelize.define("Tip", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_UUID: { 
    type: DataTypes.UUID, 
    allowNull: false, 
    references: {model: 'Users', key: 'user_UUID',}, 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE',
  },
    
}, {
  timestamps: true
});


export default Tip;
