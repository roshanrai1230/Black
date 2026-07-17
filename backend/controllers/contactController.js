const ContactMessage = require('../models/ContactMessage');

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      mobile,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get unread message count
// @route   GET /api/contact/unread/count
// @access  Private/Admin
const getUnreadCount = async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments({ isRead: false });
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  submitMessage,
  getMessages,
  getUnreadCount,
  markAsRead,
  deleteMessage
};
