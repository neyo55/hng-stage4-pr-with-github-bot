#!/bin/bash

REMOTE_USER="root"
REMOTE_HOST="46.101.11.165"
REPO_URL="https://github.com/neyo55/hng-stage4-pr-with-github-bot.git"
REMOTE_DIR="/tmp/test"

ssh -t $REMOTE_USER@$REMOTE_HOST << EOF
  # Remove existing directory if it exists to avoid conflicts
  if [ -d "$REMOTE_DIR" ]; then
    rm -rf "$REMOTE_DIR"
  fi

  # Clone the repository
  git clone "$REPO_URL" "$REMOTE_DIR" || {
    echo "Failed to clone the repository"
    exit 1
  }

  # Navigate to the project directory
  cd "$REMOTE_DIR" || {
    echo "Failed to change directory to $REMOTE_DIR"
    exit 1
  }

  # Configure Git to use a merge strategy
  git config pull.rebase false || {
    echo "Failed to configure Git merge strategy"
    exit 1
  }

  # Pull the latest changes
  git pull origin test || {
    echo "Git pull failed"
    exit 1
  }

  # Build the Docker images
  docker-compose -f docker-compose.yml up -d --build || {
    echo "Docker Compose build failed"
    exit 1
  }

  # Provide the deployment link
  echo "Deployment complete: http://46.101.11.165:5173"
EOF
