# Vue Personal Website

A personal website built with Vue.js featuring projects, blog posts, and recipes.

## Features

- **Projects**: Showcase of hardware and software projects with markdown content
- **Blog**: Personal blog posts with markdown support
- **Recipes**: Recipe collection
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Mobile-friendly layout

## Tech Stack

- Vue 3 with TypeScript
- Vite for build tooling
- Vue Router for navigation
- FontAwesome for icons
- Marked.js for markdown parsing
- Docker for containerization


## Docker Deployment

### 1. Build locally
```
docker buildx create --platform linux/arm64,linux/arm/v7,linux/amd6
docker buildx build --platform linux/amd64,linux/arm64 --push -t at1047/vue-personal-website 
```

### 2. Deploy on the server
```
sudo docker stop vue-website
sudo docker rm vue-website
sudo docker pull at1047/vue-personal-website:latest
sudo docker run -d -p 8080:80 --name vue-website at1047/vue-personal-website:latest
```

## Project Structure

```
src/
├── components/     # Reusable Vue components
├── views/         # Page components
├── router/         # Vue Router configuration
├── utils/          # Utility functions
└── assets/         # CSS and static assets

public/
├── projects/      # Project markdown files
├── blog/          # Blog markdown files
└── *.json         # Content configuration
```