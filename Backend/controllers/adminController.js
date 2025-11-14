import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// =======================
// Add Doctor Controller
// =======================
const addDoctor = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      speciality, 
      customSpeciality, 
      degree, 
      experience, 
      about, 
      fees, 
      address 
    } = req.body;

    const imageFile = req.file;

    // Validate required fields
    if (!name || !email || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle 'other' speciality
    const finalSpeciality = speciality === "other" && customSpeciality ? customSpeciality : speciality;

    // Parse address JSON
    let parsedAddress = {};
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      parsedAddress = { line1: "", line2: "" };
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, { folder: "doctors" });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ success: false, message: "Doctor image not uploaded" });
    }

    // Create doctor object
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality: finalSpeciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      image: imageUrl
    });

    await newDoctor.save();
    res.status(201).json({ success: true, message: "Doctor added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

// =======================
// Admin Login Controller
// =======================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Super admin login (env credentials)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({ success: true, token });
    }

    // Check doctor/admin in DB
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) return res.status(404).json({ success: false, message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =======================
// Get All Doctors (Admin)
// =======================
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

// =======================
// Export controllers
// =======================
export { addDoctor, loginAdmin, getAllDoctors };
