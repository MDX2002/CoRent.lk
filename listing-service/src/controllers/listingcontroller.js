const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const db = require('../config/db');

const addListing = async (req, res) => {
  try {
    const { title, description, price, location, type } = req.body;

    if (!title || !price) {
      return res.status(400).json({ error: 'Title and price are required' });
    }

    // Upload images to Cloudinary, assuming files come in req.files
    const imageUrls = [];
    const publicIds = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
      publicIds.push(result.public_id);

      // Remove local file
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting local file:', err);
      });

    }

    // Insert into DB with images as JSON string
    const sql = 'INSERT INTO rooms (title, description, price, location, listing_type, images, cloudinary_ids) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, price, location, type, JSON.stringify(imageUrls), JSON.stringify(publicIds)], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Listing added', listingId: result.insertId });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a listing
const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    // Get the Cloudinary IDs of images for this listing
    const sqlSelect = 'SELECT cloudinary_ids FROM rooms WHERE id = ?';
    db.query(sqlSelect, [id], async (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (result.length === 0) return res.status(404).json({ message: 'Listing not found' });

      const publicIds = JSON.parse(result[0].cloudinary_ids);

      // Delete images from Cloudinary
      for (const publicId of publicIds) {
        await cloudinary.uploader.destroy(publicId);
      }

      // Delete the listing from the database
      const sqlDelete = 'DELETE FROM rooms WHERE id = ?';
      db.query(sqlDelete, [id], (err2) => {
        if (err2) return res.status(500).json({ error: 'Database error' });
        res.status(200).json({ message: 'Listing deleted successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addListing, deleteListing };
