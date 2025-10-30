const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes'); // new routes for contacts
const errorHandler = require('./middleware/errorHandler'); // require the error handler

const app = express();

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes); // mount contacts CRUD

// Use global error handler (always after routes)
app.use(errorHandler);

// Listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
);