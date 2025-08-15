// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // your auth routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// --- Test route ---
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// --- Auth routes ---
app.use('/api/auth', authRoutes);

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
