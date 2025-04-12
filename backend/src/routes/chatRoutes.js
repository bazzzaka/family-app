const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply auth middleware to all chat routes
router.use(authMiddleware);

// Get all chat rooms for the authenticated user
router.get('/rooms', chatController.getChatRooms);

// Create a new chat room
router.post('/rooms', chatController.createChatRoom);

// Get a specific chat room by ID
router.get('/rooms/:roomId', chatController.getChatRoomById);

// Get messages for a specific chat room
router.get('/rooms/:roomId/messages', chatController.getChatMessages);

// Send a message in a chat room
router.post('/rooms/:roomId/messages', chatController.sendMessage);

module.exports = router; 