const express = require('express');
const cors = require('cors');
const listingRoutes = require('./routes/listingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', listingRoutes);

module.exports = app;
