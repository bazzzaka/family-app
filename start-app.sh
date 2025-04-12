#!/bin/bash

# Print colored output
print_message() {
  echo -e "\033[1;34m$1\033[0m"
}

print_error() {
  echo -e "\033[1;31m$1\033[0m"
}

print_success() {
  echo -e "\033[1;32m$1\033[0m"
}

# Check if MongoDB is running
check_mongodb() {
  print_message "Checking if MongoDB is running..."
  if ! pgrep -x mongod > /dev/null; then
    print_message "MongoDB is not running. Starting MongoDB..."
    mongod &
    sleep 3
    if pgrep -x mongod > /dev/null; then
      print_success "MongoDB started successfully"
    else
      print_error "Failed to start MongoDB"
      exit 1
    fi
  else
    print_success "MongoDB is already running"
  fi
}

# Check if Node.js is installed
check_node() {
  print_message "Checking Node.js installation..."
  if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
  fi
  print_success "Node.js is installed (version: $(node -v))"
}

# Check if npm is installed
check_npm() {
  print_message "Checking npm installation..."
  if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
  fi
  print_success "npm is installed (version: $(npm -v))"
}

# Install dependencies
install_dependencies() {
  print_message "Installing dependencies..."
  
  # Install backend dependencies
  print_message "Installing backend dependencies..."
  cd backend
  if ! npm install; then
    print_error "Failed to install backend dependencies"
    exit 1
  fi
  print_success "Backend dependencies installed successfully"
  cd ..
  
  # Install frontend dependencies
  print_message "Installing frontend dependencies..."
  cd frontend
  if ! npm install; then
    print_error "Failed to install frontend dependencies"
    exit 1
  fi
  print_success "Frontend dependencies installed successfully"
  cd ..
}

# Start the backend server
start_backend() {
  print_message "Starting the backend server..."
  cd backend
  if ! npm run dev &> backend.log & then
    print_error "Failed to start backend server"
    exit 1
  fi
  BACKEND_PID=$!
  print_success "Backend server started with PID: $BACKEND_PID"
  cd ..
}

# Start the frontend server
start_frontend() {
  print_message "Starting the frontend server..."
  cd frontend
  if ! npm start &> frontend.log & then
    print_error "Failed to start frontend server"
    exit 1
  fi
  FRONTEND_PID=$!
  print_success "Frontend server started with PID: $FRONTEND_PID"
  cd ..
}

# Setup trap to handle cleanup when script is interrupted
cleanup() {
  print_message "Stopping servers..."
  if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID 2>/dev/null
    print_message "Backend server stopped"
  fi
  if [ ! -z "$FRONTEND_PID" ]; then
    kill $FRONTEND_PID 2>/dev/null
    print_message "Frontend server stopped"
  fi
  print_message "Servers stopped. Exiting."
  exit 0
}

trap cleanup INT TERM

# Main execution
print_message "Starting Family App..."
print_message "======================================"

# Check prerequisites
check_node
check_npm
check_mongodb

# Install dependencies
install_dependencies

# Start servers
start_backend
start_frontend

print_message "======================================"
print_success "Family App is running!"
print_message "- Frontend: http://localhost:3000"
print_message "- Backend API: http://localhost:5000"
print_message "- Backend logs: backend/backend.log"
print_message "- Frontend logs: frontend/frontend.log"
print_message "Press Ctrl+C to stop both servers"
print_message "======================================"

# Keep script running
wait 