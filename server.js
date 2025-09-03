import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import galleryRoutes from "./routes/gallery.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://rsassociates.online", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("API is running"));

// Routes
app.use("/api/gallery", galleryRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
