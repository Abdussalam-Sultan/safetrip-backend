import express from 'express';
import APP_CONFIG from './config/APP_CONFIG.js';
import logger from './config/logger.js';
import sequelize from './config/sequelize.js';
import apiLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';
import emailService from './services/emailService.js';
import routes from './routes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const port = APP_CONFIG.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiLimiter);
app.use('/api/checkins', checkinRoutes);



sequelize.sync()
    .then(() => {
        logger.info('Database synchronized successfully');
    })
    .catch((error) => {
        logger.error('Error synchronizing database:', error);
    });

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
;});