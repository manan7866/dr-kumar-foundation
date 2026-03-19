#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Production Deployment Script
# Dr. Kumar Foundation Website
# ─────────────────────────────────────────────────────────────────────────────
#
# Usage:
#   ./deploy.sh
#   ./deploy.sh --rebuild
#   ./deploy.sh --logs
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.production.yml"
ENV_FILE=".env.production"
PROJECT_NAME="dr-kumar"

# ──────────────────────────────────────────────────────────────────────────
# Helper Functions
# ──────────────────────────────────────────────────────────────────────────

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_env() {
    if [ ! -f "$ENV_FILE" ]; then
        log_error "Environment file not found: $ENV_FILE"
        log_info "Copy .env.production.template to $ENV_FILE and fill in your values"
        exit 1
    fi
}

check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v docker compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
}

# ──────────────────────────────────────────────────────────────────────────
# Main Deployment Functions
# ──────────────────────────────────────────────────────────────────────────

pre_deploy() {
    log_info "Starting pre-deployment checks..."
    
    check_docker
    check_env
    
    log_success "Pre-deployment checks passed"
}

build() {
    log_info "Building Docker images..."
    
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE build --no-cache
    
    log_success "Docker images built successfully"
}

migrate() {
    log_info "Running database migrations..."
    
    # Run Prisma migrations
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE run --rm app npx prisma migrate deploy
    
    # Generate Prisma client
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE run --rm app npx prisma generate
    
    log_success "Database migrations completed"
}

start() {
    log_info "Starting services..."
    
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE up -d
    
    log_success "Services started"
}

health_check() {
    log_info "Waiting for services to be healthy..."
    
    # Wait for app to be healthy
    for i in {1..30}; do
        if docker compose -f $COMPOSE_FILE --env-file $ENV_FILE ps | grep -q "healthy"; then
            log_success "All services are healthy"
            return 0
        fi
        sleep 2
    done
    
    log_warning "Some services may not be healthy yet. Check with: docker compose ps"
}

stop() {
    log_info "Stopping services..."
    
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE down
    
    log_success "Services stopped"
}

restart() {
    log_info "Restarting services..."
    
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE restart
    
    log_success "Services restarted"
}

logs() {
    log_info "Showing logs (press Ctrl+C to exit)..."
    
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE logs -f
}

status() {
    log_info "Service status:"
    
    docker compose -f $COMPOSE_FILE --env-file $ENV_FILE ps
}

cleanup() {
    log_info "Cleaning up unused Docker resources..."
    
    docker system prune -f
    
    log_success "Cleanup completed"
}

# ──────────────────────────────────────────────────────────────────────────
# Main Script
# ──────────────────────────────────────────────────────────────────────────

case "${1:-deploy}" in
    deploy)
        pre_deploy
        build
        migrate
        start
        health_check
        status
        log_success "Deployment completed successfully!"
        ;;
    rebuild)
        pre_deploy
        stop
        build
        migrate
        start
        health_check
        status
        log_success "Rebuild completed successfully!"
        ;;
    start)
        pre_deploy
        start
        health_check
        status
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        health_check
        status
        ;;
    migrate)
        migrate
        ;;
    logs)
        logs
        ;;
    status)
        status
        ;;
    cleanup)
        cleanup
        ;;
    health)
        health_check
        ;;
    *)
        echo "Usage: $0 {deploy|rebuild|start|stop|restart|migrate|logs|status|cleanup|health}"
        exit 1
        ;;
esac

exit 0
