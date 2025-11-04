import config from "./config/index.js";
import express from "express";
import  sequelize, { ConnectDB } from "./config/db.js";
import models from "./models/index.js";
import errorHandler from "./middleware/errorHandlers.js";
import authRoutes from "./routes/auth.js"

//initializing express app
const app =  express()

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//Routes
app.get("/api/health", (req, res) => {
    res.json({status: "API is running fine and healthy"})
});
app.use("/api/auth", authRoutes)

//route default
app.use((req, res, next) => {
    res.status(404).json({success: false, message:"Route does not exist"})
})

app.use(errorHandler)

//start server
await ConnectDB();
// await sequelize.sync({alter: true})


//port listening
app.listen(config.PORT, async () => {
    console.log(`Server is running on port ${config.PORT}`)
})

