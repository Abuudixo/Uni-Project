const Assessment = require('../models/Assessment');

// @desc    Get all assessments (doctor view)
// @route   GET /api/assessments
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get assessments for the logged-in patient
// @route   GET /api/assessments/mine
exports.getMyAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single assessment by ID
// @route   GET /api/assessments/:id
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!assessment)
      return res.status(404).json({ message: 'Assessment not found' });
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Submit a new assessment
// @route   POST /api/assessments
exports.submitAssessment = async (req, res) => {
  try {
    const { assessmentType, totalScore, breakdown, severity } = req.body;

    // Check if user already completed this assessment
    const existing = await Assessment.findOne({ user: req.user.id, assessmentType });
    if (existing) {
      return res.status(400).json({ message: 'You have already completed this assessment.' });
    }

    const assessment = await Assessment.create({
      user: req.user.id,
      assessmentType,
      totalScore,
      breakdown,
      severity,
    });

    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
