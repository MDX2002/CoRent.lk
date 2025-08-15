import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Search Service running on port ${PORT}`);
});
