import { Router } from "express";
import Patient from "../models/Patient.js";

const router = Router();

// POST /api/patients/login — authenticate a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient || patient.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/patients — register a new patient/doctor
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
    
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/patients — list all patients
router.get("/", async (_req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/patients/:id — get a single patient
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update patient
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
