const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Use createPool for better connection handling
const db = mysql.createPool({
  host: process.env.DB_HOST, // fallback to Docker service name
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // Use promise-based queries for async/await

// Test connection
db.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL database.');
    connection.release();
  })
  .catch((err) => {
    console.error('MySQL connection error:', err);
  });

module.exports = db;
