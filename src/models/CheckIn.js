import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'

const CheckIn = sequelize.define('CheckIn', {
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
    defaultValue: "I'm safe",
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default CheckIn;
