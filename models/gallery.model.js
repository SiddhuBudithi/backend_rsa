import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: String,
  imageUrl: String,   // URL from Cloudinary
  description: String,
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);
