emergency-contacts-api

This backend project allows users to save, view, update and delete their emergency contacts using a simple API

Core Features
- Create, Read, Update, and Delete emergency contacts
- Each contact has a name, phone number, and relationship
- MongoDB database connection
- Validation for inputs to make sure all contacts fields are filled and the phone number format is correct

Setup
1. Run npm install
2. Add your .env file with:
MONGO_URI=your_mongo_connection
PORT=5000
3. Start server with:
npm run dev
Server runs on: http://localhost:5000