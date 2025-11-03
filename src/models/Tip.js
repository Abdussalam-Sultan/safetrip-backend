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
});


export default Tip;
