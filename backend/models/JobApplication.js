const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  currentPosition: {
    type: String,
    trim: true,
    default: ''
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  relevantExperience: {
    type: String,
    trim: true,
    default: ''
  },
  noticePeriod: {
    type: String,
    trim: true,
    default: ''
  },
  resume: {
    type: String,
    required: true
  },
  portfolioLink: {
    type: String,
    trim: true,
    default: ''
  },
  coverLetter: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interviewing', 'Rejected', 'Hired'],
    default: 'Applied'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
