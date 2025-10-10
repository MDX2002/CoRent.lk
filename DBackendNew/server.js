const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "127.0.0.1",       // local machine
  user: "root",
  password: "KivinduM123!", // match docker-compose password
  database: "room_booking", // match docker-compose database
  port: 3307   
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL ✅");
});

/* --------- Places API --------- */
// Get places with optional search + filter
app.get("/places", (req, res) => {
  const { search = "", type = "" } = req.query;
  let sql = "SELECT id, name, type, location, price FROM places WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND (name LIKE ? OR type LIKE ? OR location LIKE ? OR price LIKE ?)";
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (type) {
    sql += " AND type = ?";
    params.push(type);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Delete place
app.delete("/places/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM places WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Place deleted successfully" });
  });
});

/* --------- Users API --------- */
// Get users with optional search + filter
app.get("/users", (req, res) => {
  const { search = "", type = "" } = req.query;
  let sql = "SELECT id, name, Email, UserName, Type FROM users WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND (name LIKE ? OR Type LIKE ? OR Email LIKE ? OR UserName LIKE ?)";
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (type) {
    sql += " AND Type = ?";
    params.push(type);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

/* --------- Customer Reviews API --------- */
// Add review
app.post("/add", (req, res) => {
  const { name, note, stars } = req.body;
  if (!name || stars === undefined) {
    return res.status(400).json({ error: "Name and stars are required" });
  }

  const sql = "INSERT INTO ratings (name, note, stars) VALUES (?, ?, ?)";
  db.query(sql, [name, note, stars], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

// Get all reviews
app.get("/ratings", (req, res) => {
  db.query("SELECT id, name, note, stars, created_at  FROM ratings ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Delete review
app.delete("/ratings/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM ratings WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Review deleted successfully" });
  });
});

/* --------- Start Server --------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});
