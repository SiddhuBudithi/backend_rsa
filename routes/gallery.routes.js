// backend/routes/gallery.routes.js

import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import Gallery from "../models/gallery.model.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temporary storage

// Upload image & save metadata
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gallery",
    });

    const newImage = new Gallery({
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      imageUrl: result.secure_url, // Cloudinary URL
    });

    await newImage.save();
    res.json({ message: "Image uploaded & saved!", data: newImage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
