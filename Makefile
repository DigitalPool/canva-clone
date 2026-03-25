# ============================
# Canva Clone Docker Makefile
# ============================

COMPOSE=docker compose -p $(PROJECT_NAME)
PROJECT_NAME=canva-clone-2025

.DEFAULT_GOAL := help

.PHONY: help up up-build build build-nc down restart re logs ps clean fclean prune \
	mongo-shell mongo-logs client-shell client-logs gateway-shell gateway-logs \
	design-shell design-logs upload-shell upload-logs subscription-shell subscription-logs

# ----------------------------
# Basic Commands
# ----------------------------

up:
	$(COMPOSE) up

up-build:
	$(COMPOSE) up --build

build:
	$(COMPOSE) build

build-nc:
	$(COMPOSE) build --no-cache

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) down
	$(COMPOSE) up --build

re: restart

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

# ----------------------------
# Cleanup
# ----------------------------

prune:
	docker system prune -f

clean:
	$(COMPOSE) down --volumes --remove-orphans

fclean:
	$(COMPOSE) down --volumes --remove-orphans
	docker system prune -af
	docker volume prune -f

# ----------------------------
# Mongo Helpers
# ----------------------------

mongo-shell:
	$(COMPOSE) exec mongo mongosh -u root -p rootpassword --authenticationDatabase admin

mongo-logs:
	$(COMPOSE) logs -f mongo

# ----------------------------
# Client Helpers
# ----------------------------

client-shell:
	$(COMPOSE) exec client sh

client-logs:
	$(COMPOSE) logs -f client

# ----------------------------
# API Gateway Helpers
# ----------------------------

gateway-shell:
	$(COMPOSE) exec api-gateway sh

gateway-logs:
	$(COMPOSE) logs -f api-gateway

# ----------------------------
# Microservice Helpers
# ----------------------------

design-shell:
	$(COMPOSE) exec design-service sh

design-logs:
	$(COMPOSE) logs -f design-service

upload-shell:
	$(COMPOSE) exec upload-service sh

upload-logs:
	$(COMPOSE) logs -f upload-service

subscription-shell:
	$(COMPOSE) exec subscription-service sh

subscription-logs:
	$(COMPOSE) logs -f subscription-service

# ----------------------------
# Help
# ----------------------------

help:
	@echo ""
	@echo "Available Commands:"
	@echo "  make up                  - Start all containers"
	@echo "  make up-build            - Build and start all containers"
	@echo "  make build               - Build all images"
	@echo "  make build-nc            - Build images (no cache)"
	@echo "  make down                - Stop all containers"
	@echo "  make restart             - Rebuild and restart all containers"
	@echo "  make logs                - View logs for all services"
	@echo "  make ps                  - Show running containers"
	@echo ""
	@echo "  make clean               - Stop + remove volumes + orphans"
	@echo "  make fclean              - Full cleanup (images + volumes)"
	@echo "  make prune               - Docker system prune"
	@echo ""
	@echo "  make mongo-shell         - Open Mongo shell"
	@echo "  make client-shell        - Enter client container"
	@echo "  make gateway-shell       - Enter API gateway container"
	@echo "  make design-shell        - Enter design service container"
	@echo "  make upload-shell        - Enter upload service container"
	@echo "  make subscription-shell  - Enter subscription service container"
	@echo ""
	@echo "  make mongo-logs          - Mongo logs"
	@echo "  make client-logs         - Client logs"
	@echo "  make gateway-logs        - API gateway logs"
	@echo "  make design-logs         - Design service logs"
	@echo "  make upload-logs         - Upload service logs"
	@echo "  make subscription-logs   - Subscription service logs"
	@echo ""
