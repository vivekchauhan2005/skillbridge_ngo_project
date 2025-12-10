import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"; // update path if necessary

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // React frontend port
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Connection error:", err));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is working"));

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
