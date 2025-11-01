// export for all env credentials
import dotenv from 'dotenv';

dotenv.config();

 const APP_CONFIG =  {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,

    JWT_SECRET: process.env.JWT_SECRET,
    OTP_SECRET: process.env.OTP_SECRET,

    EMAIL_SERVICE_SMTP_HOST: process.env.EMAIL_SERVICE_SMTP_HOST,
    EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,
    EMAIL_SERVICE_APP_PASSWORD: process.env.EMAIL_SERVICE_APP_PASSWORD,
    EMAIL_SERVICE_PORT: process.env.EMAIL_SERVICE_PORT,
    PINO_LOG_LEVEL_CONSOLE: process.env.PINO_LOG_LEVEL_CONSOLE,
    PINO_LOG_LEVEL_FILE: process.env.PINO_LOG_LEVEL_FILE,

    GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
};

export default APP_CONFIG;

