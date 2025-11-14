// backend/routes/adminRoute.js
import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';
import multer from 'multer';
import Doctor from '../models/doctorModel.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Add doctor route (already exists)
router.post('/add-doctor', authAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, email, password, experience, fees, about, speciality, degree, address } = req.body;

    const newDoctor = await Doctor.create({
      name,
      email,
      password,
      experience,
      fees,
      about,
      speciality,
      degree,
      address: JSON.parse(address),
      image: req.file.path,
    });

    res.status(201).json({ success: true, message: 'Doctor added successfully', doctor: newDoctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// **POST route for fetching all doctors**
router.post('/all-doctors', authAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
