const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * Get all chat rooms for the current user
 */
exports.getChatRooms = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;
    
    // Find all chat rooms where the user is a participant
    const chatRooms = await ChatRoom.find({ 
      participants: userId,
      isActive: true 
    })
    .populate('participants', 'name email avatar')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });
    
    // Format the response
    const formattedChatRooms = chatRooms.map(room => {
      // For direct chats, set the name to the other participant's name
      let roomName = room.name;
      let otherParticipant = null;
      
      if (room.type === 'direct') {
        otherParticipant = room.participants.find(
          participant => participant._id.toString() !== userId
        );
        if (otherParticipant) {
          roomName = otherParticipant.name;
        }
      }
      
      return {
        id: room._id,
        name: roomName,
        type: room.type,
        participants: room.participants.map(p => ({
          id: p._id,
          name: p.name,
          avatar: p.avatar
        })),
        lastMessage: room.lastMessage ? {
          id: room.lastMessage._id,
          content: room.lastMessage.content,
          sender: room.lastMessage.sender.name,
          timestamp: room.lastMessage.createdAt
        } : null,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt
      };
    });
    
    res.status(200).json({ chatRooms: formattedChatRooms });
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get a single chat room by ID
 */
exports.getChatRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;
    
    // Validate roomId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid chat room ID' });
    }
    
    // Find the chat room and check if user is a participant
    const chatRoom = await ChatRoom.findOne({
      _id: roomId,
      participants: userId,
      isActive: true
    })
    .populate('participants', 'name email avatar')
    .populate('familyGroup', 'name');
    
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    
    // Format the response
    let roomName = chatRoom.name;
    let otherParticipant = null;
    
    if (chatRoom.type === 'direct') {
      otherParticipant = chatRoom.participants.find(
        participant => participant._id.toString() !== userId
      );
      if (otherParticipant) {
        roomName = otherParticipant.name;
      }
    }
    
    const formattedChatRoom = {
      id: chatRoom._id,
      name: roomName,
      type: chatRoom.type,
      participants: chatRoom.participants.map(p => ({
        id: p._id,
        name: p.name,
        avatar: p.avatar
      })),
      familyGroup: chatRoom.familyGroup ? {
        id: chatRoom.familyGroup._id,
        name: chatRoom.familyGroup.name
      } : null,
      createdAt: chatRoom.createdAt,
      updatedAt: chatRoom.updatedAt
    };
    
    res.status(200).json({ chatRoom: formattedChatRoom });
  } catch (error) {
    console.error('Error fetching chat room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create a new chat room
 */
exports.createChatRoom = async (req, res) => {
  try {
    const { name, type, participants, familyGroup } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!type) {
      return res.status(400).json({ message: 'Chat room type is required' });
    }
    
    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: 'At least one participant is required' });
    }
    
    // For direct chats, validate that there are exactly 2 participants
    if (type === 'direct' && participants.length !== 1) {
      return res.status(400).json({ 
        message: 'Direct chat rooms should have exactly one other participant' 
      });
    }
    
    // Add the current user to participants if not already included
    const allParticipants = [...new Set([userId, ...participants])];
    
    // For direct chats, check if there's already a chat room with the same participants
    if (type === 'direct') {
      const existingRoom = await ChatRoom.findOne({
        type: 'direct',
        participants: { $all: allParticipants, $size: allParticipants.length },
        isActive: true
      });
      
      if (existingRoom) {
        return res.status(200).json({ 
          message: 'Chat room already exists',
          chatRoomId: existingRoom._id
        });
      }
    }
    
    // Create the new chat room
    const chatRoom = new ChatRoom({
      name: type === 'direct' ? '' : name, // For direct chats, name is derived from participant
      type,
      participants: allParticipants,
      familyGroup: familyGroup || null
    });
    
    await chatRoom.save();
    
    res.status(201).json({ 
      message: 'Chat room created successfully',
      chatRoomId: chatRoom._id
    });
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get messages for a chat room
 */
exports.getChatMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;
    const { limit = 50, before } = req.query;
    
    // Validate roomId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid chat room ID' });
    }
    
    // Check if user is a participant in the chat room
    const chatRoom = await ChatRoom.findOne({
      _id: roomId,
      participants: userId,
      isActive: true
    });
    
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    
    // Build query to get messages
    const query = {
      chatRoom: roomId,
      isDeleted: false
    };
    
    // If before timestamp is provided, get messages before that time
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }
    
    // Get messages for the chat room
    const messages = await Message.find(query)
      .populate('sender', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    // Mark messages as read by current user
    const messageIds = messages.map(msg => msg._id);
    await Message.updateMany(
      { 
        _id: { $in: messageIds },
        'readBy.user': { $ne: userId }
      },
      { 
        $push: { 
          readBy: { 
            user: userId, 
            readAt: new Date() 
          } 
        } 
      }
    );
    
    // Format messages for response
    const formattedMessages = messages.map(msg => ({
      id: msg._id,
      content: msg.content,
      attachments: msg.attachments,
      sender: {
        id: msg.sender._id,
        name: msg.sender.name,
        avatar: msg.sender.avatar
      },
      timestamp: msg.createdAt,
      readBy: msg.readBy,
      isOwnMessage: msg.sender._id.toString() === userId
    }));
    
    res.status(200).json({ messages: formattedMessages.reverse() }); // Reverse to get oldest first
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Send a message in a chat room
 */
exports.sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content, attachments } = req.body;
    const userId = req.user.id;
    
    // Validate roomId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid chat room ID' });
    }
    
    // Validate content
    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ message: 'Message content or attachments are required' });
    }
    
    // Check if user is a participant in the chat room
    const chatRoom = await ChatRoom.findOne({
      _id: roomId,
      participants: userId,
      isActive: true
    });
    
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    
    // Create the message
    const message = new Message({
      sender: userId,
      content: content || '',
      chatRoom: roomId,
      attachments: attachments || [],
      readBy: [{ user: userId, readAt: new Date() }]
    });
    
    await message.save();
    
    // Update the lastMessage reference in the chat room
    chatRoom.lastMessage = message._id;
    await chatRoom.save();
    
    // Populate sender information for response
    await message.populate('sender', 'name email avatar');
    
    // Format the response
    const formattedMessage = {
      id: message._id,
      content: message.content,
      attachments: message.attachments,
      sender: {
        id: message.sender._id,
        name: message.sender.name,
        avatar: message.sender.avatar
      },
      timestamp: message.createdAt,
      readBy: message.readBy,
      isOwnMessage: true
    };
    
    res.status(201).json({ message: formattedMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 