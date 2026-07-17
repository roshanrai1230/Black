const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, deleteApplication } = require('../controllers/applicationController');

router.post('/', submitApplication);
router.get('/', getApplications);
router.delete('/:id', deleteApplication);

module.exports = router;
