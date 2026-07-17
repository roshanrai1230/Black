const express = require('express');
const router = express.Router();
const { getJobs, adminGetJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');

router.get('/', getJobs);
router.get('/admin', adminGetJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
