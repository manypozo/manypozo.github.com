# Makefile for Manuel Pozo's Resume Website
# Modern resume website with useful development commands

.PHONY: help dev test clean validate format lint install serve preview

# Default target
.DEFAULT_GOAL := help

# Variables
PORT ?= 8000
PREVIEW_PORT ?= 8001
PYTHON ?= python3

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
PURPLE := \033[0;35m
CYAN := \033[0;36m
WHITE := \033[0;37m
RESET := \033[0m

##@ Help
help: ## Show this help message
	@echo "$(CYAN)Manuel Pozo's Resume Website$(RESET)"
	@echo "$(YELLOW)==============================$(RESET)"
	@echo ""
	@echo "$(GREEN)Available commands:$(RESET)"
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(CYAN)%-15s$(RESET) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(RESET)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development
dev: ## Start development server
	@echo "$(GREEN)Starting development server on port $(PORT)...$(RESET)"
	@echo "$(YELLOW)Visit: http://localhost:$(PORT)$(RESET)"
	@echo "$(YELLOW)Press Ctrl+C to stop$(RESET)"
	@$(PYTHON) -m http.server $(PORT)

serve: dev ## Alias for dev command

preview: ## Start preview server on different port
	@echo "$(GREEN)Starting preview server on port $(PREVIEW_PORT)...$(RESET)"
	@echo "$(YELLOW)Visit: http://localhost:$(PREVIEW_PORT)$(RESET)"
	@echo "$(YELLOW)Press Ctrl+C to stop$(RESET)"
	@$(PYTHON) -m http.server $(PREVIEW_PORT)

##@ Validation & Testing
validate: ## Validate HTML, CSS, and JSON files
	@echo "$(GREEN)Validating files...$(RESET)"
	@echo "$(BLUE)Validating HTML...$(RESET)"
	@if command -v tidy >/dev/null 2>&1; then \
		tidy -q -e index.html; \
	else \
		echo "$(YELLOW)HTML Tidy not found, skipping HTML validation$(RESET)"; \
	fi
	@echo "$(BLUE)Validating JSON...$(RESET)"
	@$(PYTHON) -m json.tool data/resume.json > /dev/null && echo "$(GREEN)✓ JSON is valid$(RESET)" || echo "$(RED)✗ JSON is invalid$(RESET)"
	@echo "$(BLUE)Validating CSS...$(RESET)"
	@if command -v css-validator >/dev/null 2>&1; then \
		css-validator styles.css; \
	else \
		echo "$(YELLOW)CSS Validator not found, skipping CSS validation$(RESET)"; \
	fi
	@echo "$(GREEN)Validation complete!$(RESET)"

test: ## Run basic tests
	@echo "$(GREEN)Running tests...$(RESET)"
	@echo "$(BLUE)Testing file existence...$(RESET)"
	@test -f index.html && echo "$(GREEN)✓ index.html exists$(RESET)" || echo "$(RED)✗ index.html missing$(RESET)"
	@test -f styles.css && echo "$(GREEN)✓ styles.css exists$(RESET)" || echo "$(RED)✗ styles.css missing$(RESET)"
	@test -f script.js && echo "$(GREEN)✓ script.js exists$(RESET)" || echo "$(RED)✗ script.js missing$(RESET)"
	@test -f data/resume.json && echo "$(GREEN)✓ data/resume.json exists$(RESET)" || echo "$(RED)✗ data/resume.json missing$(RESET)"
	@echo "$(BLUE)Testing JSON syntax...$(RESET)"
	@$(PYTHON) -c "import json; json.load(open('data/resume.json'))" && echo "$(GREEN)✓ JSON syntax is valid$(RESET)" || echo "$(RED)✗ JSON syntax is invalid$(RESET)"
	@echo "$(BLUE)Testing HTTP server...$(RESET)"
	@$(PYTHON) -m http.server $(PORT) &
	@SERVER_PID=$$!; \
	sleep 2; \
	if curl -s http://localhost:$(PORT) > /dev/null; then \
		echo "$(GREEN)✓ HTTP server responds$(RESET)"; \
	else \
		echo "$(RED)✗ HTTP server not responding$(RESET)"; \
	fi; \
	kill $$SERVER_PID 2>/dev/null || true
	@echo "$(GREEN)Tests complete!$(RESET)"

##@ Code Quality
format: ## Format JSON file
	@echo "$(GREEN)Formatting code...$(RESET)"
	@echo "$(BLUE)Formatting JSON...$(RESET)"
	@$(PYTHON) -c "import json; data=json.load(open('data/resume.json')); json.dump(data, open('data/resume.json', 'w'), indent=2, ensure_ascii=False)" && echo "$(GREEN)✓ JSON formatted$(RESET)"
	@echo "$(GREEN)Formatting complete!$(RESET)"

lint: ## Basic linting (JSON validation only)
	@echo "$(GREEN)Linting code...$(RESET)"
	@echo "$(BLUE)Validating JSON...$(RESET)"
	@$(PYTHON) -c "import json; json.load(open('data/resume.json'))" && echo "$(GREEN)✓ JSON is valid$(RESET)" || echo "$(RED)✗ JSON is invalid$(RESET)"
	@echo "$(GREEN)Linting complete!$(RESET)"

##@ Maintenance
clean: ## Clean temporary files
	@echo "$(GREEN)Cleaning temporary files...$(RESET)"
	@find . -name "*.tmp" -delete 2>/dev/null || true
	@find . -name "*.log" -delete 2>/dev/null || true
	@find . -name ".DS_Store" -delete 2>/dev/null || true
	@find . -name "Thumbs.db" -delete 2>/dev/null || true
	@echo "$(GREEN)Clean complete!$(RESET)"

install: ## Install Python dependencies (optional)
	@echo "$(GREEN)Installing Python dependencies...$(RESET)"
	@echo "$(BLUE)Installing Python tools...$(RESET)"
	@$(PYTHON) -m pip install --user html5lib cssselect 2>/dev/null || echo "$(YELLOW)Python tools installation failed (optional)$(RESET)"
	@echo "$(GREEN)Installation complete!$(RESET)"
	@echo "$(YELLOW)Note: This project only requires Python for the development server$(RESET)"

##@ Information
info: ## Show project information
	@echo "$(CYAN)Manuel Pozo's Resume Website$(RESET)"
	@echo "$(YELLOW)==============================$(RESET)"
	@echo ""
	@echo "$(GREEN)Project Structure:$(RESET)"
	@echo "  $(BLUE)index.html$(RESET)     - Main HTML file"
	@echo "  $(BLUE)styles.css$(RESET)     - CSS styles"
	@echo "  $(BLUE)script.js$(RESET)      - JavaScript functionality"
	@echo "  $(BLUE)data/resume.json$(RESET) - Resume data"
	@echo "  $(BLUE)assets/images/$(RESET)  - Images and SVGs"
	@echo ""
	@echo "$(GREEN)File Sizes:$(RESET)"
	@wc -c index.html styles.css script.js data/resume.json 2>/dev/null | tail -1 | awk '{print "  Total: " $$1 " bytes"}'
	@echo ""
	@echo "$(GREEN)Git Status:$(RESET)"
	@git status --short 2>/dev/null || echo "  Not a git repository"
	@echo ""
	@echo "$(GREEN)Last Modified:$(RESET)"
	@ls -la index.html styles.css script.js data/resume.json 2>/dev/null | awk '{print "  " $$9 ": " $$6 " " $$7 " " $$8}'

status: ## Show project status
	@echo "$(GREEN)Project Status$(RESET)"
	@echo "$(YELLOW)==============$(RESET)"
	@echo ""
	@echo "$(BLUE)Files:$(RESET)"
	@ls -la index.html styles.css script.js data/resume.json 2>/dev/null
	@echo ""
	@echo "$(BLUE)Git Status:$(RESET)"
	@git status --short 2>/dev/null || echo "Not a git repository"
	@echo ""
	@echo "$(BLUE)Recent Commits:$(RESET)"
	@git log --oneline -5 2>/dev/null || echo "No git history"


##@ Quick Actions
quick-test: ## Quick test without full validation
	@echo "$(GREEN)Quick test...$(RESET)"
	@$(PYTHON) -c "import json; json.load(open('data/resume.json'))" && echo "$(GREEN)✓ JSON valid$(RESET)" || echo "$(RED)✗ JSON invalid$(RESET)"
	@test -f index.html && echo "$(GREEN)✓ HTML exists$(RESET)" || echo "$(RED)✗ HTML missing$(RESET)"
	@test -f styles.css && echo "$(GREEN)✓ CSS exists$(RESET)" || echo "$(RED)✗ CSS missing$(RESET)"
	@test -f script.js && echo "$(GREEN)✓ JS exists$(RESET)" || echo "$(RED)✗ JS missing$(RESET)"

quick-serve: ## Quick serve without validation
	@echo "$(GREEN)Quick serve on port $(PORT)...$(RESET)"
	@$(PYTHON) -m http.server $(PORT)

backup: ## Create a backup of the project
	@echo "$(GREEN)Creating backup...$(RESET)"
	@BACKUP_NAME="resume-backup-$(shell date +%Y%m%d-%H%M%S)"; \
	tar -czf "$$BACKUP_NAME.tar.gz" index.html styles.css script.js data/ assets/ README.md Makefile .gitignore scripts/ 2>/dev/null; \
	echo "$(GREEN)Backup created: $$BACKUP_NAME.tar.gz$(RESET)"


##@ Development Workflow
dev-workflow: ## Complete development workflow
	@echo "$(GREEN)Starting development workflow...$(RESET)"
	@$(MAKE) clean
	@$(MAKE) validate
	@$(MAKE) test
	@$(MAKE) format
	@$(MAKE) dev

# Show help if no target specified
%:
	@echo "$(RED)Unknown target: $@$(RESET)"
	@echo "$(YELLOW)Run 'make help' to see available commands$(RESET)"
