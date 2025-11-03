const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Database error:", err));