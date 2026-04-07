const User = require('../models/User');
const Assessment = require('../models/Assessment');

// @desc    Get all users (doctor/admin only)
// @route   GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Delete user and their assessments
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  console.log('DELETE request received for user:', req.params.id);
  try {
    // 1. Delete all assessments for this user
    const deletedAssessments = await Assessment.deleteMany({ user: req.params.id });
    console.log(`Deleted ${deletedAssessments.deletedCount} assessments for user ${req.params.id}`);

    // 2. Delete the user
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      console.log('User not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User deleted successfully:', req.params.id);
    res.json({ message: 'User and all associated data deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
