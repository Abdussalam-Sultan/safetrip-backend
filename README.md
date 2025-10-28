# 🛡️ Safetrip Backend

Safetrip is a mobile safety application that helps users stay safe by sending SOS alerts, check-ins, and locating nearby emergency stations in real-time.  
This repository contains the **backend API** built with **Node.js**, **Express**, and **MySQL**.

---

## Features

- **User Authentication** – Secure signup/login using JWT tokens  
- **Emergency Contacts** – Add, update, and delete trusted contacts  
- **SOS Alert** – One-tap emergency alert system with location sharing  
- **Check-In** – Non-emergency “I’m safe” updates  
- **Timeline** – View log of SOS alerts and check-ins  
- **Nearby Help** – Integrate with Geoapify API to find nearby police stations, hospitals, and fuel stations  
- **Safety Tips** – Static safety content for users  
- **Secure & Scalable** – Input validation, error handling, and rate limiting

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Validation | express-validator |
| Authentication | JWT (JSON Web Tokens) |
| API Testing | Postman |
| External API | Geoapify |
| Logger | Pino |
| Mailer | Nodemailer |

---

## Project Structure

safetrip-backend/
│
├── src/
│ ├── config/ # DB connection, environment setup, email config, logger config
│ ├── middleware/ # Auth, error handler, rate limiter
│ ├── models/ # Sequelize models
│ ├── controllers/ # Route controllers
│ ├── services/ # Business logic
│ ├── routes/ # All API routes
│ ├── utils/ # Helpers 
│ └── app.js # Main Express setup
│
├── .env.example # Environment variable template
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Abdussalam-Sultan/safetrip-backend.git
cd safetrip-backend
```

### 2. Install Dependencies
```
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root directory using .env.example file as a guide:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=safeguard_db
JWT_SECRET=your_jwt_secret
GEOAPIFY_API_KEY=your_geoapify_key
```
### 5. Start the Server

npm run dev

The backend will start on http://localhost:3000

### API Testing (Postman)

Import the Postman collection from /postman/safetrip_collection.json

Test all endpoints:

- /api/auth/register

- /api/auth/login

- /api/contacts

- /api/sos

- /api/checkin

- /api/timeline

- /api/nearby e.g /api/nearby?lat=1000&long=4000&type=service.police ...

## Authors

Safetrip Development Team
Backend: Node.js, Express, MySQL
Frontend/Mobile: React Native

Built with ❤️ for campus and travel safety.

- Abdussalam Sultan


