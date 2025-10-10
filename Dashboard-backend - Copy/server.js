const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "room_booking"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL ✅");
});

/* --------- Places/Listings API --------- */
// Get listings with optional search + filter
app.get("/listings", (req, res) => {
  const { search = "", type = "" } = req.query;
  let sql = "SELECT id, owner_id, listing_type, location, price FROM listings WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND (listing_type LIKE ? OR location LIKE ? OR price LIKE ?)";
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (type) {
    sql += " AND listing_type = ?";
    params.push(type);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Delete listing
app.delete("/listings/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM listings WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Listing deleted successfully" });
  });
});

/* --------- Users API --------- */
// Get users with optional search + filter
app.get("/users", (req, res) => {
  const { search = "", type = "" } = req.query;
  let sql = "SELECT id, name, email, contact_number, created_at FROM users WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND (name LIKE ? OR email LIKE ? OR contact_number LIKE ?)";
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
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

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

/* --------- Customer Reviews API --------- */
/*
// Add review
app.post("/ratings", (req, res) => {
  const { name, note, stars } = req.body;
  if (!name || stars === undefined) {
    return res.status(400).json({ error: "Name and stars are required" });
  }

  const sql = "INSERT INTO ratings (name, note, stars) VALUES (?, ?, ?)";
  db.query(sql, [name, note, stars], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId, message: "Review added successfully" });
  });
});
***/
// Get all reviews
app.get("/ratings", (req, res) => {
  db.query("SELECT id, name, note, stars, created_at FROM ratings ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});
/*
// Update review
app.put("/ratings/:id", (req, res) => {
  const { id } = req.params;
  const { name, note, stars } = req.body;
  
  if (!name || stars === undefined) {
    return res.status(400).json({ error: "Name and stars are required" });
  }

  const sql = "UPDATE ratings SET name = ?, note = ?, stars = ? WHERE id = ?";
  db.query(sql, [name, note, stars, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Review updated successfully" });
  });
});
*/
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

/*
// Add new listing
app.post("/listings", (req, res) => {
  const { owner_id, listing_type, location, price } = req.body;
  
  if (!owner_id || !listing_type || !location || !price) {
    return res.status(400).json({ error: "All fields are required: owner_id, listing_type, location, price" });
  }

  const sql = "INSERT INTO listings (owner_id, listing_type, location, price) VALUES (?, ?, ?, ?)";
  db.query(sql, [owner_id, listing_type, location, price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId, message: "Listing added successfully" });
  });
});

// Update listing
app.put("/listings/:id", (req, res) => {
  const { id } = req.params;
  const { owner_id, listing_type, location, price } = req.body;
  
  if (!owner_id || !listing_type || !location || !price) {
    return res.status(400).json({ error: "All fields are required: owner_id, listing_type, location, price" });
  }

  const sql = "UPDATE listings SET owner_id = ?, listing_type = ?, location = ?, price = ? WHERE id = ?";
  db.query(sql, [owner_id, listing_type, location, price, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Listing updated successfully" });
  });
});
*/