# Automated Pull Request Deployment with Docker and GitHub Bot

### Overview:

This repository contains the code for a simple `HTML` website that is deployed using `Docker`. Each pull request (PR) opens a fresh container to deploy the branch for testing and review purposes. The system ensures that containers are updated with new commits and cleaned up upon PR closure to optimize resource utilization.

- **Dockerfile**: Defines the Docker image for the simple HTML website.
- **index.html**: Main HTML file for the website.
- **style.css**: CSS file for styling the website.

### Prerequisites:
1. Docker installed on your system.

### Implementation Guide
**Setting up the Docker Environment:**