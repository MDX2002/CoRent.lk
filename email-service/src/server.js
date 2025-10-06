const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Health check
app.get("/", (req, res) => res.send("✅ Email Service is running"));

const PORT = process.env.PORT || 6060;
app.listen(PORT, () => console.log(`🚀 Email service running on port ${PORT}`));

