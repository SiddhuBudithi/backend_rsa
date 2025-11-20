// routes/contact.routes.js
import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/contact.model.js"; // new model

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, place, subject } = req.body;

    if (!name || !email || !subject) {
      return res.status(400).json({ error: "Name, email, and subject are required" });
    }

    // 1) Save to MongoDB
    const contactDoc = new Contact({ name, email, phone, place, subject });
    await contactDoc.save();

    // 2) Send email
    // Using Gmail: make sure CONTACT_EMAIL and CONTACT_PASSWORD are set in env (app password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.CONTACT_EMAIL, // sender (company email)
      to: process.env.CONTACT_EMAIL,   // send to company mailbox
      subject: `New Contact Message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Place: ${place || "N/A"}`,
        `Message: ${subject}`,
        `Received At: ${new Date().toLocaleString()}`,
      ].join("\n"),
    };

    // try to send mail, but don't fail saving if email fails (still report email failure)
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ success: true, message: "Message stored and emailed" });
  } catch (error) {
    console.error("Contact form error:", error);
    // if saved but email failed, you may still return 200; here we return 500 for any error
    return res.status(500).json({ error: "Failed to process contact form" });
  }
});

export default router;
