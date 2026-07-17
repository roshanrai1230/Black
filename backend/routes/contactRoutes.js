const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, getUnreadCount, markAsRead, deleteMessage } = require('../controllers/contactController');

router.post('/', submitMessage);
router.get('/', getMessages);
router.get('/unread/count', getUnreadCount);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

module.exports = router;
