const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/assessments', require('./routes/assessments'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MindBridge API is running 🚀' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5001;

// Seed Doctor Account
const seedDoctor = async () => {
  const User = require('./models/User');
  const bcrypt = require('bcryptjs');
  try {
    const existing = await User.findOne({ email: 'doctor@mindbridge.com' });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('doctor123', salt);
      await User.create({
        name: 'Dr. Amina Hassan',
        email: 'doctor@mindbridge.com',
        password: hashedPassword,
        role: 'doctor',
      });
      console.log('🩺 Seeded default Doctor account: doctor@mindbridge.com / doctor123');
    }
  } catch (err) {
    console.error('Failed to seed doctor:', err.message);
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await seedDoctor();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
