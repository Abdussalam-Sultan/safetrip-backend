import dotenv from "dotenv";
dotenv.config();


export default{
    ENVIRONMENT:process.env.NODE_ENV || 'dev',
    PORT: Number(process.env.PORT || 3000),
    DATABASE_NAME: process.env.DATABASE_NAME || "mini_whatsapp",
    DATABASE_USERNAME:process.env.DATABASE_USERNAME || "gboy",
    DATABASE_PASSWORD:process.env.DATABASE_PASSWORD || "emma*1nuel",
    DATABASE_HOST:process.env.DATABASE_HOST || "localhost",
    DATABASE_PORT:Number(process.env.DATABASE_PORT || 3306),
    DATABASE_DIALECT:process.env.DATABASE_DIALECT || "mysql",
    SMTP_HOST: process.env.SMTP_HOST || "smpt.example.com",
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || "dev",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || "devpass",
    SMTP_SECURE: process.env.SMTP_SECURE === "true"|| false, 
    TYPICODE_BASE_URL: process.env.TYPICODE_BASE_URL || "https://jsonplaceholder.typicode.com",
    TYPICODE_BASE_API_KEY: process.env.TYPICODE_BASE_API_KEY || "",
    REDIS_TTL:Number(process.env.REDIS_TTL || 300),
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    JWT_SECRET: process.env.JWT_SECRET || "98HYGRTVGSFW534266YRTGBGSFREDN&-=JMNGFS665342567098",
    JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN || 7200),
    JWT_REFRESH_EXPIRES_IN: Number(process.env.JWT_REFRESH_EXPIRES_IN || 25200),
    JWT_OTP_SECRET: process.env.JWT_OTP_SECRET,
    OTP_EXPIRY_TIME_MINS: process.env.OTP_EXPIRY_TIME_MINS || 5
};