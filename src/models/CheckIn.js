import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const CheckIn = sequelize.define('CheckIn', {
  checkin_UUID: {
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
    defaultValue: "I'm safe",
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
    allowNull: false,
  },
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: true,
});

export default CheckIn;
