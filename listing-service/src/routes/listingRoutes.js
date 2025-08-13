const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { addListing, deleteListing } = require('../controllers/listingcontroller');

// For multiple images, field name 'images' matches the form input name
router.post('/listings', upload.array('images', 4), addListing);

router.delete('/listings/:id', deleteListing);

module.exports = router;
