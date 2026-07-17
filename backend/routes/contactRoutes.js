const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, getUnreadCount, markAsRead } = require('../controllers/contactController');

router.post('/', submitMessage);
router.get('/', getMessages);
router.get('/unread/count', getUnreadCount);
router.put('/:id/read', markAsRead);

module.exports = router;
