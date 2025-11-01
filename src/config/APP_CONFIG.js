// export for all env credentials
import dotenv from 'dotenv';

dotenv.config();

 const APP_CONFIG =  {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    PORT: Number(process.env.PORT || 3000),
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN || 25200),
    OTP_SECRET: process.env.OTP_SECRET,
    ACCESS_TOKEN_EXPIRY_TIME: process.env.ACCESS_TOKEN_EXPIRY_TIME,
    VERIFICATION_TOKEN_EXPIRY_TIME: process.env.VERIFICATION_TOKEN_EXPIRY_TIME,


    EMAIL_SERVICE_SMTP_HOST: process.env.EMAIL_SERVICE_SMTP_HOST,
    EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,
    EMAIL_SERVICE_APP_PASSWORD: process.env.EMAIL_SERVICE_APP_PASSWORD,
    EMAIL_SERVICE_PORT: Number(process.env.EMAIL_SERVICE_PORT || 465),
    EMAIL_SERVICE_SMTP_SECURE: process.env.EMAIL_SERVICE_SMTP_SECURE === "true",
    OTP_EXPIRY_TIME_MINS: Number(process.env.OTP_EXPIRY_TIME_MINS || 5),

    PINO_LOG_LEVEL_CONSOLE: process.env.PINO_LOG_LEVEL_CONSOLE,
    PINO_LOG_LEVEL_FILE: process.env.PINO_LOG_LEVEL_FILE,

    GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
};

export default APP_CONFIG;

