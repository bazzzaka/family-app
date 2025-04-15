.PHONY: up down build logs clean prune frontend-dev backend-dev install-deps

# Default target
all: up

# Build and start containers in detached mode
up:
	docker-compose up -d

# Build containers without starting them
build:
	docker-compose build

# Stop and remove containers
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Frontend logs
frontend-logs:
	docker-compose logs -f frontend

# Backend logs
backend-logs:
	docker-compose logs -f backend

# Start frontend in development mode
frontend-dev:
	cd frontend && npm start

# Start backend in development mode
backend-dev:
	cd backend && npm run dev

# Start both frontend and backend in development mode
dev: 
	@echo "Starting backend in background..."
	cd backend && npm run dev &
	@echo "Starting frontend..."
	cd frontend && npm start

# Install dependencies for both frontend and backend
install-deps:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Clean containers
clean:
	docker-compose down
	docker-compose rm -f

# Prune Docker resources (use with caution)
prune:
	docker system prune -af

# Restart containers
restart:
	docker-compose restart

# Show Docker status
status:
	@echo "=== Docker Containers ==="
	@docker ps
	@echo "\n=== Docker Images ==="
	@docker images
	@echo "\n=== Docker Networks ==="
	@docker network ls | grep family-app

# Run migrations if any
migrate:
	@echo "No migrations configured yet"

# Help command
help:
	@echo "Available targets:"
	@echo "  up              - Start all containers in detached mode"
	@echo "  down            - Stop and remove all containers"
	@echo "  build           - Build all containers"
	@echo "  logs            - View logs from all containers"
	@echo "  frontend-logs   - View frontend logs"
	@echo "  backend-logs    - View backend logs"
	@echo "  frontend-dev    - Run frontend in development mode"
	@echo "  backend-dev     - Run backend in development mode"
	@echo "  dev             - Run both frontend and backend in development mode"
	@echo "  install-deps    - Install dependencies for frontend and backend"
	@echo "  clean           - Stop and remove containers"
	@echo "  prune           - Clean up unused Docker resources"
	@echo "  restart         - Restart all containers"
	@echo "  status          - Show Docker status"
	@echo "  help            - Show this help message" 