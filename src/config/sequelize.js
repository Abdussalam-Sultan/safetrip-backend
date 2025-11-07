import { Sequelize } from 'sequelize';
import APP_CONFIG from './APP_CONFIG.js';

//  Create Sequelize instance
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "mysql",
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
      }
    );



try {
  await sequelize.authenticate();
  console.log(' Database connected successfully!');
} catch (error) {
  console.error(' Unable to connect to the database:', error);
}
export default sequelize;
