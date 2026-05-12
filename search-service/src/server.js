{/*const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Search service running on port ${PORT}`));
*/}

// search-service/src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Allow requests from your frontend only
app.use(cors({
  origin: 'http://localhost:5173', // <-- your React dev server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

app.use('/api', searchRoutes);

app.get('/', (req, res) => {
  res.send('Search Service is running!');
});

app.listen(PORT, () => console.log(`Search service running on port ${PORT}`));
