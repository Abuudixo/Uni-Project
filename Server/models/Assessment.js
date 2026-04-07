const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assessmentType: {
      type: String,
      required: true, // e.g. "mentalHealth"
    },
    totalScore: {
      type: Number,
      required: true,
    },
    breakdown: {
      type: Object, // e.g. { "Depression": { score: 5, count: 2 }, ... }
      default: {},
    },
    severity: {
      type: Object, // e.g. { label: "Mild", color: "yellow", ... }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
