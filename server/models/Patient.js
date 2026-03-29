import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    firstName:        { type: String, required: true },
    lastName:         { type: String, required: true },
    dob:              { type: String, required: true },
    email:            { type: String, required: true, unique: true },
    password:         { type: String, required: true },
    role:             { type: String, enum: ["patient", "doctor"], default: "patient" },
    phone:            { type: String, default: "" },
    pronouns:         { type: String, default: "" },
    diagnoses:        { type: [String], default: [] },
    medications:      { type: String, default: "" },
    allergies:        { type: String, default: "" },
    notes:            { type: String, default: "" },
    consentTreatment: { type: Boolean, default: false },
    consentData:      { type: Boolean, default: false },
    consentContact:   { type: Boolean, default: false },
    scores: {
      phq9: { type: Number, default: null },
      gad7: { type: Number, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
