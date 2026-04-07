const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser } = require('../controllers/usersController');
const protect = require('../middleware/auth');

// @route   GET /api/users
router.get('/', protect, getUsers);

// @route   GET /api/users/:id
router.get('/:id', protect, getUserById);

// @route   DELETE /api/users/:id
router.delete('/:id', protect, deleteUser);

module.exports = router;
