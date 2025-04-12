# Family App

A comprehensive family management application with features for messaging, photo sharing, family tree visualization, and budget management.

## Features

- **Secure Messaging**: Chat with family members in private or group conversations
- **Photo Albums**: Share and manage photos with privacy controls
- **Family Tree**: Create and visualize your family's genealogy with support for distant/unknown relatives
- **Micro-families**: Create subgroups within your larger family structure
- **Budget Management**: Track expenses and manage finances for each micro-family
- **Instagram-like Feed**: Share content with family members in a familiar social media format

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB for database
- Socket.io for real-time messaging
- JWT for authentication
- Multer for file uploads

### Frontend
- React.js
- Material UI for components
- Socket.io-client for real-time communication
- GoJS for family tree visualization
- React Router for navigation

## Project Structure

```
family-app/
├── backend/             # Backend code
│   ├── config/          # Configuration files
│   ├── src/             # Source code
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Middleware functions
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.js     # Entry point
│   ├── uploads/         # Uploaded files
│   └── package.json     # Dependencies
├── frontend/            # React frontend
│   ├── public/          # Static files
│   ├── src/             # Source code
│   │   ├── components/  # React components
│   │   ├── context/     # React contexts
│   │   ├── pages/       # Page components
│   │   └── App.js       # Main app component
│   └── package.json     # Dependencies
└── README.md            # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas instance)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/family-app.git
cd family-app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/family-app
JWT_SECRET=your_jwt_secret_key_change_in_production
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the App

1. Start MongoDB (if using local instance)
```bash
mongod
```

2. Start the backend server
```bash
cd backend
npm run dev
```

3. In a separate terminal, start the frontend development server
```bash
cd frontend
npm start
```

4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Development Status

This project is in active development. The current implementation includes:

- Backend API with models and routes for all major features
- Frontend UI with core pages and components
- Authentication system with JWT
- Real-time messaging with Socket.io
- Family tree visualization with GoJS

Some features are currently implemented as placeholders and will be fully developed in future iterations.

## License

MIT

## Acknowledgements

- [Signal Protocol](https://github.com/signalapp/libsignal-protocol-javascript) - Inspiration for secure messaging
- [GoJS](https://gojs.net/) - Family tree visualization
- [Material UI](https://mui.com/) - UI components