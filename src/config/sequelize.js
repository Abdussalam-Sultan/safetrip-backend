import { Sequelize } from 'sequelize';
import APP_CONFIG from './APP_CONFIG.js';

//  Create Sequelize instance
const sequelize = new Sequelize(APP_CONFIG.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});



try {
  await sequelize.authenticate();
  console.log(' Database connected successfully!');
} catch (error) {
  console.error(' Unable to connect to the database:', error);
}
export default sequelize;
