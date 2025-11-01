// Sequelize setup
import { Sequelize } from 'sequelize';
import APP_CONFIG from './APP_CONFIG.js';

const sequelize = new Sequelize(`${APP_CONFIG.DB_NAME}`,`${APP_CONFIG.DB_USER}`,`${APP_CONFIG.DB_PASS}`, {
  
  host: `${APP_CONFIG.DB_HOST}`,
  dialect: 'mysql',
  port: Number(`${APP_CONFIG.DB_PORT}` || 3306),
});
export const ConnectDB = async()=>{
try{
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
}catch (error) {
  console.error('Unable to connect to the database:', error);
}
};
export default sequelize;
