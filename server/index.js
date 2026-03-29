import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import patientRoutes from "./routes/patient.js";
import assessmentRoutes from "./routes/assessment.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────
app.use("/api/patients", patientRoutes);
app.use("/api/assessments", assessmentRoutes);

app.get("/", (_req, res) => res.json({ status: "MindBridge API running" }));

// ── Database & Start ───────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
