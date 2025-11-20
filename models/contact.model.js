// models/Contact.model.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    place: { type: String },
    subject: { type: String, required: true }, // message body
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
