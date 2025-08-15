import pool from "../config/db.js";

// Search by title, address or price
export const searchItems = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const [rows] = await pool.query(
            `SELECT * FROM places 
             WHERE title LIKE ? 
                OR description LIKE ?
                OR CAST(price AS CHAR) LIKE ?`,
            [`%${query}%`, `%${query}%`, `%${query}%`]
        );

        res.json(rows);
    } catch (err) {

        {/*
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
    */}


        console.error("Search error:", err); 
        res.status(500).json({ message: err.message });
    }


};

