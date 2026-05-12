# 🏠 CoRent.lk

A full-stack rental property marketplace built with a microservices architecture.  
Users can search for places, register, log in, verify emails, and manage listings.  
The platform separates authentication, business logic, and frontend into independent services.

---

## ✨ Features

- **User Authentication** – Registration, login, and email verification using JWT
- **Places Search** – Dynamic search with keyword, type, location, and price filters
- **Listings** – Browse and sort rental listings
- **Microservices** – Isolated services for auth, posts, and email delivery
- **Responsive Frontend** – React app with React Router and Axios

---

## 🧱 Tech Stack

| Layer | Technology |
|------|------|
| Frontend | React (Vite), Axios, React Router |
| Backend | Node.js, Express |
| Database | MySQL |
| Authentication | bcryptjs, JSON Web Tokens (JWT) |
| Email | Nodemailer |
| Containerisation | Docker, Docker Compose (optional) |

---

## 🏗️ Architecture

```text
├── auth-service        # Registration, login, email verification
├── DBackendNew         # Main API for places, users, reviews
├── email-service       # Sends verification emails
├── frontend/client     # Main React application
├── Dashboard           # Admin panel (React)
└── Dfrontends          # Alternative public frontend
```

Each service runs independently and communicates via REST APIs.  
The frontend consumes the auth and backend APIs to provide a seamless user experience.

---

# 🚀 Getting Started

## Prerequisites

- Node.js (v18 or later)
- MySQL (local or remote)
- Docker (optional, for containerised deployment)

---

## 1. Clone the Repository

```bash
git clone https://github.com/MDX2002/CoRent.lk.git
cd CoRent.lk
```

---

## 2. Environment Variables

Create `.env` files in the following services using the provided `.env.example` templates.

### `auth-service/.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_db
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_URL=http://localhost:4000
```

### `DBackendNew/.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=corent_db
```

### `email-service/.env`

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 3. Database Setup

Execute the SQL scripts found in:

```text
docker-entrypoint-initdb.d/
```

Or create the schemas manually to initialise the tables.

---

## 4. Install Dependencies & Start Services

### Auth Service

```bash
cd auth-service
npm install
npm start
```

### Main Backend (Places, Users)

```bash
cd DBackendNew
npm install
npm start
```

### Email Service

```bash
cd email-service
npm install
npm start
```

### Frontend

```bash
cd frontend/client
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 5. Using Docker (Optional)

Each service contains a `Dockerfile`.  
You can build and run them individually or use Docker Compose if provided.

---

# 📡 API Endpoints

## Auth Service (`/api/auth`)

| Method | Endpoint | Description |
|------|------|------|
| POST | `/register` | Create a new user |
| POST | `/login` | Authenticate user |
| GET | `/verify/:token` | Verify email address |

---

## Main Backend (`/api`)

| Method | Endpoint | Description |
|------|------|------|
| GET | `/places?search=...&type=...` | Search/filter places |
| GET | `/users?search=...&type=...` | Search/filter users |

Additional CRUD endpoints are available for places, reviews, and user management.

---

# 🧩 Frontend Pages

- **Login/Signup Modal** – Toggles between registration and login
- **Search Page** – Live search with sorting
- **Landing Page** – Introduces the platform
- **Place Details** – Individual listing views

---

# 👥 Team

This project is a collaborative effort developed as part of a software-oriented computing course unit.

### Team Members

- Kivindu Rajamanukula
- Malindu Dilmin
- Gayathra

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add some amazing feature"
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 📄 License

This project is currently not licensed.  
All rights reserved by the author(s).

If you intend to use or distribute this code, please contact the repository owner.

---

Built with by the CoRent.lk team
