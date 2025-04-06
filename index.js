import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileRoutes from "./Routes/fileRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${process.env.PORT} → http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", fileRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
