const Job = require('../models/Job');

// @desc    Get all active jobs (Public)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all jobs (Admin)
// @route   GET /api/jobs/admin
// @access  Private/Admin
const adminGetJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs for admin:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = async (req, res) => {
  try {
    const { title, department, experience, location, description } = req.body;

    if (!title || !department || !experience || !location) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newJob = await Job.create({
      title,
      department,
      experience,
      location,
      description
    });

    res.status(201).json({
      success: true,
      data: newJob
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = async (req, res) => {
  try {
    const { title, department, experience, location, description, isActive } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job.title = title !== undefined ? title : job.title;
    job.department = department !== undefined ? department : job.department;
    job.experience = experience !== undefined ? experience : job.experience;
    job.location = location !== undefined ? location : job.location;
    job.description = description !== undefined ? description : job.description;
    job.isActive = isActive !== undefined ? isActive : job.isActive;

    await job.save();

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getJobs,
  adminGetJobs,
  createJob,
  updateJob,
  deleteJob
};
