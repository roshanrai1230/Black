const multer = require('multer');
const path = require('path');
const fs = require('fs');
const JobApplication = require('../models/JobApplication');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for allowed extensions (PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
  }
};

// Multer Upload Instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('resume');

// @desc    Submit a new job application
// @route   POST /api/applications
// @access  Public
const submitApplication = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const {
        jobTitle,
        fullName,
        email,
        phone,
        location,
        currentPosition,
        experience,
        relevantExperience,
        noticePeriod,
        portfolioLink,
        coverLetter
      } = req.body;

      // Validate required text fields
      if (!jobTitle || !fullName || !email || !phone || !location || !experience) {
        // Clean up uploaded file if validation failed
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields (Job Title, Full Name, Email, Phone, Location, Experience)'
        });
      }

      // Check if resume file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload your resume'
        });
      }

      // Save to database
      // The resume field will store the filename which can be used to download/serve the file
      const newApplication = await JobApplication.create({
        jobTitle,
        fullName,
        email,
        phone,
        location,
        currentPosition,
        experience,
        relevantExperience,
        noticePeriod,
        resume: req.file.filename,
        portfolioLink,
        coverLetter
      });

      res.status(201).json({
        success: true,
        data: newApplication
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      // Clean up uploaded file on server error
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkErr) {
          console.error('Error deleting file after DB failure:', unlinkErr);
        }
      }
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
};

// @desc    Get all job applications
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a job application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
const deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Delete associated resume file
    const filePath = path.join(__dirname, '../uploads', application.resume);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (fileErr) {
        console.error('Error deleting resume file from disk:', fileErr);
      }
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Application and associated file deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  deleteApplication
};
