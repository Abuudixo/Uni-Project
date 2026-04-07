const express = require('express');
const router = express.Router();
const {
  getAssessments,
  getAssessmentById,
  submitAssessment,
  getMyAssessments,
} = require('../controllers/assessmentsController');
const protect = require('../middleware/auth');

// @route   GET /api/assessments
router.get('/', protect, getAssessments);

// @route   GET /api/assessments/mine
router.get('/mine', protect, getMyAssessments);

// @route   GET /api/assessments/:id
router.get('/:id', protect, getAssessmentById);

// @route   POST /api/assessments
router.post('/', protect, submitAssessment);

module.exports = router;
