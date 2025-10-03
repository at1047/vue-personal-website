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

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```


## Docker Deployment

Build and run the container:

```bash
# Build the image
docker build -t vue-personal-website .

# Run the container
docker run -p 8080:80 vue-personal-website
```

The application will be available at `http://localhost:8080`

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