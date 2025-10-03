{/*const axios = require('axios');

const LISTING_SERVICE_URL = process.env.LISTING_SERVICE_URL || "http://localhost:5000";

const getListings = async (req, res) => {
  try {
    const { q, sortField, sortBy } = req.query;

    // fetch all listings from listing service
    const response = await axios.get(`${LISTING_SERVICE_URL}/api/listings`);
    let listings = response.data;

    // 🔎 Filter
    if (q) {
      const query = q.toLowerCase();
      listings = listings.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.price.toString().includes(query)
      );
    }

    // 📊 Sorting
    if (sortField) {
      listings.sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
        if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();

        if (sortBy === "descending") {
          return fieldA < fieldB ? 1 : -1;
        } else {
          return fieldA > fieldB ? 1 : -1;
        }
      });
    }

    res.json(listings);

  } catch (error) {
    console.error("Error fetching listings in search service:", error.message);
    res.status(500).json({ error: "Error fetching listings" });
  }
};

module.exports = { getListings };
*/}

// search-service/src/controllers/searchController.js

// search-service/src/controllers/searchController.js
const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

exports.getListings = async (req, res) => {
  try {
    const { q = '', sortField = 'title', sortBy = 'ascending' } = req.query;

    // Validate sortField to prevent SQL injection
    const allowedFields = ['title', 'location', 'price'];
    const field = allowedFields.includes(sortField) ? sortField : 'title';

    const order = sortBy === 'descending' ? 'DESC' : 'ASC';

    // Simple search query
    const sql = `
      SELECT * FROM listings 
      WHERE title LIKE ? OR location LIKE ? OR price LIKE ?
      ORDER BY ${field} ${order}
    `;

    const [rows] = await pool.execute(sql, [`%${q}%`, `%${q}%`, `%${q}%`]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
};
