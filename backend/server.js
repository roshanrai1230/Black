require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Seed jobs if database is empty
const Job = require('./models/Job');
const seedJobs = async () => {
  try {
    const count = await Job.countDocuments();
    if (count === 0) {
      const defaultJobs = [
        { title: 'Frontend Developer (React.js)', experience: '2-4 Yrs Exp', location: 'Mohali, India', department: 'Engineering' },
        { title: 'Backend Developer (Node.js)', experience: '3-5 Yrs Exp', location: 'Mohali, India', department: 'Engineering' },
        { title: 'UI/UX Designer', experience: '2-4 Yrs Exp', location: 'Remote', department: 'Design' },
        { title: 'DevOps Engineer', experience: '3-6 Yrs Exp', location: 'Mohali, India', department: 'Engineering' }
      ];
      await Job.insertMany(defaultJobs);
      console.log('Database seeded with default jobs successfully');
    }
  } catch (err) {
    console.error('Error seeding default jobs:', err);
  }
};
seedJobs();

const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is healthy' });
});

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/admin/auth', require('./routes/adminAuthRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
