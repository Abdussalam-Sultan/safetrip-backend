import { Sequelize } from "sequelize";
import config from "./index.js"


const sequelize = new Sequelize(
    config.DATABASE_NAME,
    config.DATABASE_USERNAME,
    config.DATABASE_PASSWORD,
    {
        dialect: config.DATABASE_DIALECT,
        port: config.DATABASE_PORT || 3306,
        host: config.DATABASE_HOST,
        logging: (msg)=> console.log(msg)
    }
);

export const ConnectDB = async ()=>{

    try{
        await sequelize.authenticate();
         //await sequelize.sync({force: true})
        console.log("Database Connected")
    }catch(error) {
        console.log("Database Error", error);
    }
};

export default sequelize;