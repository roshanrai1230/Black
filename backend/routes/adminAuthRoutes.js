const express = require('express');
const router = express.Router();
const { googleLogin, verifySession, logout } = require('../controllers/adminAuthController');

router.post('/google', googleLogin);
router.get('/verify', verifySession);
router.post('/logout', logout);
router.get('/google-client-id', (req, res) => {
  res.json({ clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com' });
});

module.exports = router;
