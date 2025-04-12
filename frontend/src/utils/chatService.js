import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper for getting auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

/**
 * Get all chat rooms for the current user
 */
export const getChatRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/chat/rooms`, getAuthHeaders());
    return response.data.chatRooms;
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    throw error;
  }
};

/**
 * Get a specific chat room by ID
 */
export const getChatRoomById = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/rooms/${roomId}`, getAuthHeaders());
    return response.data.chatRoom;
  } catch (error) {
    console.error('Error fetching chat room:', error);
    throw error;
  }
};

/**
 * Create a new chat room
 */
export const createChatRoom = async (chatRoomData) => {
  try {
    const response = await axios.post(`${API_URL}/chat/rooms`, chatRoomData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating chat room:', error);
    throw error;
  }
};

/**
 * Get messages for a specific chat room
 */
export const getChatMessages = async (roomId, limit = 50, before = null) => {
  try {
    let url = `${API_URL}/chat/rooms/${roomId}/messages?limit=${limit}`;
    if (before) {
      url += `&before=${before}`;
    }
    
    const response = await axios.get(url, getAuthHeaders());
    return response.data.messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

/**
 * Send a message in a chat room
 */
export const sendMessage = async (roomId, messageData) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/rooms/${roomId}/messages`, 
      messageData, 
      getAuthHeaders()
    );
    return response.data.message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Initialize Socket.io connection for real-time chat
 * This function would be used with the socket.io-client library
 */
export const initializeSocketConnection = (socket, userId, roomId, handlers) => {
  if (!socket) return;
  
  // Join the room
  socket.emit('joinRoom', roomId);
  
  // Set up event listeners
  if (handlers.onReceiveMessage) {
    socket.on('receiveMessage', handlers.onReceiveMessage);
  }
  
  if (handlers.onUserTyping) {
    socket.on('userTyping', handlers.onUserTyping);
  }
  
  if (handlers.onUserStoppedTyping) {
    socket.on('userStoppedTyping', handlers.onUserStoppedTyping);
  }
  
  // Return a cleanup function to remove listeners
  return () => {
    socket.off('receiveMessage');
    socket.off('userTyping');
    socket.off('userStoppedTyping');
  };
};

// Helper functions for socket events
export const emitTyping = (socket, roomId, userId) => {
  if (!socket) return;
  socket.emit('typing', { roomId, userId });
};

export const emitStopTyping = (socket, roomId, userId) => {
  if (!socket) return;
  socket.emit('stopTyping', { roomId, userId });
};

export const emitSendMessage = (socket, message) => {
  if (!socket) return;
  socket.emit('sendMessage', message);
}; 