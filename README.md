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
- Material UI for components with Apple-inspired design
- Socket.io-client for real-time communication
- GoJS for family tree visualization
- React Router for navigation
- Framer Motion for animations

## Project Structure

```
family-app/
├── backend/                # Backend code
│   ├── config/             # Configuration files
│   ├── src/                # Source code
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Middleware functions
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── index.js        # Entry point
│   ├── uploads/            # Uploaded files
│   └── package.json        # Dependencies
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── context/        # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json        # Dependencies
├── Dockerfile.frontend     # Frontend Docker configuration
├── Dockerfile.backend      # Backend Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration for frontend
├── Makefile                # Make commands for managing the app
└── README.md               # This file
```

## Getting Started

### Option 1: Using Docker (Recommended)

The simplest way to run the application is using Docker and Make commands:

1. Make sure you have Docker and Docker Compose installed
2. Create a `.env` file in the backend directory (see Configuration section below)
3. Run the application:

```bash
# Build and start all containers
make up

# Or to just build without starting
make build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

To stop the application:
```bash
make down
```

### Option 2: Manual Installation

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas instance)
- npm or yarn

#### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/family-app.git
cd family-app
```

2. Install all dependencies:
```bash
make install-deps
```

Or manually:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory (see Configuration section below)

4. Start the development servers:
```bash
# Start both frontend and backend
make dev

# Or start them separately
make backend-dev
make frontend-dev
```

## Configuration

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/family-app
JWT_SECRET=your_jwt_secret_key_change_in_production
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

## Using the Makefile

The project includes a Makefile with various commands to simplify development:

```bash
# Show all available commands
make help

# Common commands:
make up           # Start Docker containers
make down         # Stop Docker containers
make logs         # View Docker logs
make dev          # Run in development mode
make install-deps # Install dependencies
make status       # Show Docker status
```

## Development Status

This project is in active development. The current implementation includes:

- Backend API with models and routes for all major features
- Frontend UI with Apple-inspired design
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
- [Apple Design](https://developer.apple.com/design/) - Design inspiration