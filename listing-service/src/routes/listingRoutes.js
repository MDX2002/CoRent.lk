const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { addListing, deleteListing, getListings, getUserListings, getListingById } = require('../controllers/listingcontroller');

// For multiple images, field name 'images' matches the form input name
router.post('/listings', upload.array('images', 4), addListing);

router.delete('/listings/:id', deleteListing);

router.get('/listings', getListings);

router.get('/listings/user', getUserListings);

router.get('/listings/:id', getListingById);


module.exports = router;
