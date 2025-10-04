// src/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,   // up to 10 connections
  queueLimit: 0
});

// Optional: test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL pool connection error:', err);
  } else {
    console.log('✅ MySQL pool connected');
    connection.release();
  }
});

module.exports = pool.promise(); // export as promise-based pool
