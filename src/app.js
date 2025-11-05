import express from 'express';
import APP_CONFIG from './config/APP_CONFIG.js';
import logger from './config/logger.js';
import sequelize from './config/sequelize.js';
import apiLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';
import routes from './routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();

const port = APP_CONFIG.PORT;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("SafeTrip API is running...");
});
app.use("/api", apiLimiter);
app.use('/api', routes);


sequelize.sync()
    .then(() => {
        logger.info('Database synchronized successfully');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
;});