import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

//Routes
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 3000;


sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database error:", err));