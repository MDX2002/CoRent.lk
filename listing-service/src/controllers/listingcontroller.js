const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const addListing = async (req, res) => {
  try {

    // 1. Extract JWT from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    // 2. Decode JWT to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ownerId = decoded.id;

    const { title, description, price, location, listing_type } = req.body;

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

    // Insert into DB with images as JSON string/ownerid
    const sql = 'INSERT INTO listings (title, description, price, location, listing_type, images, cloudinary_ids, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, price, location, listing_type, JSON.stringify(imageUrls), JSON.stringify(publicIds), ownerId], (err, result) => {
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

  try {


    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ownerId = decoded.id;

    const { id } = req.params;
    // Get the Cloudinary IDs of images for this listing
    const sqlSelect = 'SELECT owner_id, cloudinary_ids FROM listings WHERE id = ?';
    db.query(sqlSelect, [id], async (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (result.length === 0) return res.status(404).json({ message: 'Listing not found' });
      if (result[0].owner_id !== ownerId) return res.status(403).json({ error: 'Forbidden: Not your listing' });

      const publicIds = JSON.parse(result[0].cloudinary_ids);

      // Delete images from Cloudinary
      for (const publicId of publicIds) {
        await cloudinary.uploader.destroy(publicId);
      }

      // Delete the listing from the database
      const sqlDelete = 'DELETE FROM listings WHERE id = ?';
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

// Fetch all listings with owner info
const getListings = async (req, res) => {
  const sql = 'SELECT * FROM listings';
  db.query(sql, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    // Attach owner info
    const listingsWithOwner = await Promise.all(results.map(async (listing) => {
      try {
        const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/auth/user/${listing.owner_id}`);
        listing.owner = response.data;
      } catch (e) {
        listing.owner = { name: 'Unknown', contact_number: '' };
      }
      return listing;
    }));

    res.json(listingsWithOwner);
  });
};

// ------------------- Get User Listings (Private) -------------------
const getUserListings = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ownerId = decoded.id;

    const sql = 'SELECT * FROM listings WHERE owner_id = ?';
    db.query(sql, [ownerId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single listing by ID
const getListingById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM listings WHERE id = ?';
  db.query(sql, [id], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Listing not found' });

    const listing = results[0];

    try {
      // Optional: attach owner info
      const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/auth/user/${listing.owner_id}`);
      listing.owner = response.data;
    } catch (e) {
      listing.owner = { name: 'Unknown', contact_number: '' };
    }

    res.json(listing);
  });
};


module.exports = { addListing, deleteListing, getListings, getUserListings,getListingById };
