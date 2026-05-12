const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/listings', searchController.getListings);

module.exports = router;
