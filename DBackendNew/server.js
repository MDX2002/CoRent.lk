const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------
// MySQL Connection
// ---------------------
const db = mysql.createConnection({
  host: "127.0.0.1",       // local machine
  user: "root",            // match docker-compose
  password: "KivinduM123!",// match docker-compose
  database: "room_booking",// match docker-compose
  port: 3307               // host-mapped port from Docker
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Docker MySQL ✅");
});

// ---------------------
// Listings API (limited fields)
// ---------------------

// Get all listings
app.get("/listings", (req, res) => {
  const sql = "SELECT owner_id AS ownerID, listing_type AS listingType, location, price FROM listings";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete a listing
app.delete("/listings/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM listings WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Listing deleted successfully" });
  });
});

// ---------------------
// Users API (limited fields)
// ---------------------

// Get all users
app.get("/users", (req, res) => {
  const sql = "SELECT name, email, contact_number AS contactNo, created_at AS createdAt FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

// ---------------------
// Ratings API (Customer Reviews)
// ---------------------

// Add a review
app.post("/ratings", (req, res) => {
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
  db.query("SELECT id, name, note, stars, created_at FROM ratings ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete a review
app.delete("/ratings/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM ratings WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Review deleted successfully" });
  });
});

// ---------------------
// Start Server
// ---------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});
