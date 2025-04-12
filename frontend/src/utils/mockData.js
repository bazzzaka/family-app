// Mock data for chat functionality
// This will be replaced with API calls to the backend in production

// Chat Rooms
export const mockChatRooms = [
  {
    id: '1',
    name: 'Smith Family',
    type: 'group',
    lastMessage: {
      sender: 'Sarah Smith',
      content: 'When is the family dinner?',
      timestamp: '11:30 AM'
    },
    unreadCount: 3,
    participants: [
      { id: '1', name: 'John Smith', avatar: '' },
      { id: '2', name: 'Mary Smith', avatar: '' },
      { id: '3', name: 'Sarah Smith', avatar: '' }
    ]
  },
  {
    id: '2',
    name: 'John Smith',
    type: 'direct',
    lastMessage: {
      sender: 'John Smith',
      content: 'Did you see the photos I shared?',
      timestamp: 'Yesterday'
    },
    unreadCount: 0,
    participants: [
      { id: '1', name: 'John Smith', avatar: '' }
    ]
  },
  {
    id: '3',
    name: 'Birthday Planning',
    type: 'group',
    lastMessage: {
      sender: 'Michael Johnson',
      content: 'I can bring the cake!',
      timestamp: '2 days ago'
    },
    unreadCount: 0,
    participants: [
      { id: '1', name: 'John Smith', avatar: '' },
      { id: '4', name: 'Michael Johnson', avatar: '' },
      { id: '5', name: 'Emily Wilson', avatar: '' }
    ]
  },
  {
    id: '4',
    name: 'Mary Smith',
    type: 'direct',
    lastMessage: {
      sender: 'Mary Smith',
      content: 'Let\'s talk about the budget for this month.',
      timestamp: '1 week ago'
    },
    unreadCount: 0,
    participants: [
      { id: '2', name: 'Mary Smith', avatar: '' }
    ]
  }
];

// Messages for chat rooms
export const mockMessages = [
  // Smith Family Group Chat
  {
    id: '1',
    chatRoomId: '1',
    sender: {
      id: '3',
      name: 'Sarah Smith',
      avatar: ''
    },
    content: 'Hello everyone! When is the family dinner planned for this weekend?',
    timestamp: '2023-05-10T11:30:00.000Z',
    status: 'read'
  },
  {
    id: '2',
    chatRoomId: '1',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: ''
    },
    content: 'I think mom said Saturday at 6 PM. Let me confirm.',
    timestamp: '2023-05-10T11:32:00.000Z',
    status: 'read'
  },
  {
    id: '3',
    chatRoomId: '1',
    sender: {
      id: '2',
      name: 'Mary Smith',
      avatar: ''
    },
    content: 'Yes, Saturday at 6 PM at our house. Everyone please bring a side dish!',
    timestamp: '2023-05-10T11:35:00.000Z',
    status: 'read'
  },
  {
    id: '4',
    chatRoomId: '1',
    sender: {
      id: '3',
      name: 'Sarah Smith',
      avatar: ''
    },
    content: 'Great! I\'ll bring dessert.',
    timestamp: '2023-05-10T11:36:00.000Z',
    status: 'read'
  },
  {
    id: '5',
    chatRoomId: '1',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: ''
    },
    content: 'I\'ll bring some drinks and snacks.',
    timestamp: '2023-05-10T11:40:00.000Z',
    status: 'read'
  },
  
  // Direct message with John Smith
  {
    id: '6',
    chatRoomId: '2',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: ''
    },
    content: 'Hey, did you see the photos I shared in the family album?',
    timestamp: '2023-05-09T15:20:00.000Z',
    status: 'read'
  },
  {
    id: '7',
    chatRoomId: '2',
    sender: {
      id: 'currentUser',
      name: 'Current User',
      avatar: ''
    },
    content: 'Not yet, I\'ll check them out today!',
    timestamp: '2023-05-09T15:25:00.000Z',
    status: 'read'
  },
  {
    id: '8',
    chatRoomId: '2',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: ''
    },
    content: 'They\'re from our hiking trip last weekend. I think you\'ll like them.',
    timestamp: '2023-05-09T15:30:00.000Z',
    status: 'read'
  },
  
  // Birthday Planning Group
  {
    id: '9',
    chatRoomId: '3',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: ''
    },
    content: 'So we\'re all set for dad\'s surprise birthday party next Friday?',
    timestamp: '2023-05-07T10:15:00.000Z',
    status: 'read'
  },
  {
    id: '10',
    chatRoomId: '3',
    sender: {
      id: '4',
      name: 'Michael Johnson',
      avatar: ''
    },
    content: 'Yes, I\'ve reserved the restaurant for 7 PM.',
    timestamp: '2023-05-07T10:20:00.000Z',
    status: 'read'
  },
  {
    id: '11',
    chatRoomId: '3',
    sender: {
      id: '5',
      name: 'Emily Wilson',
      avatar: ''
    },
    content: 'I\'ll handle the decorations. Should we do balloons?',
    timestamp: '2023-05-07T10:25:00.000Z',
    status: 'read'
  },
  {
    id: '12',
    chatRoomId: '3',
    sender: {
      id: '4',
      name: 'Michael Johnson',
      avatar: ''
    },
    content: 'I can bring the cake!',
    timestamp: '2023-05-07T10:30:00.000Z',
    status: 'read'
  },
  
  // Direct message with Mary Smith
  {
    id: '13',
    chatRoomId: '4',
    sender: {
      id: '2',
      name: 'Mary Smith',
      avatar: ''
    },
    content: 'Hi there! We need to talk about the budget for this month.',
    timestamp: '2023-05-03T14:10:00.000Z',
    status: 'read'
  },
  {
    id: '14',
    chatRoomId: '4',
    sender: {
      id: 'currentUser',
      name: 'Current User',
      avatar: ''
    },
    content: 'Sure, I\'ve been tracking our expenses. What specifically do you want to discuss?',
    timestamp: '2023-05-03T14:15:00.000Z',
    status: 'read'
  },
  {
    id: '15',
    chatRoomId: '4',
    sender: {
      id: '2',
      name: 'Mary Smith',
      avatar: ''
    },
    content: 'I think we should adjust our grocery budget. Prices have gone up recently.',
    timestamp: '2023-05-03T14:20:00.000Z',
    status: 'read'
  }
]; 