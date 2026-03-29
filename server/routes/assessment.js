import { Router } from "express";
import Patient from "../models/Patient.js";

const router = Router();

// PATCH /api/assessments/:patientId — submit / update a score
// Body: { key: "phq9" | "gad7", score: Number }
router.patch("/:patientId", async (req, res) => {
  try {
    const { key, score } = req.body;
    if (!["phq9", "gad7"].includes(key)) {
      return res.status(400).json({ error: "Invalid assessment key" });
    }
    const patient = await Patient.findByIdAndUpdate(
      req.params.patientId,
      { $set: { [`scores.${key}`]: score } },
      { new: true }
    );
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
