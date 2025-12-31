<template>

  <div class="section-headers">
    <h2 class="section-title">Projects</h2>
  </div>
  <div class="projects-container">
    <div v-if="loading" class="loading-message">
      <p>Loading projects...</p>
    </div>
    <ul class="projects-list">
      <li v-for="project in allProjects" :key="project.id" class="project-item">
        <router-link v-if="project.route" :to="project.route" class="project-link">
          <img v-if="project.icon" :src="project.icon" :alt="project.title + ' icon'" class="project-icon" :class="{ 'tripod-icon': project.id === 'tripod' }" />
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description hide-on-mobile">{{ project.description }}</p>
            <p class="project-tech">Tech used: {{ project.technologies }}</p>
          </div>
        </router-link>
        <!--
        <div v-else @click="openPopup(project.id)" class="project-link project-clickable">
          <img v-if="project.icon" :src="project.icon" :alt="project.title + ' icon'" class="project-icon" :class="{ 'tripod-icon': project.id === 'tripod' }" />
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <p class="project-tech">Tech used: {{ project.technologies }}</p>
          </div>
        </div>
        -->
      </li>
    </ul>
  </div>

  <!-- Project Popup Modal -->

  <!--
  <div v-if="showPopup" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <div class="popup-header">
        <h2>{{ popupProject.title }}</h2>
        <button class="popup-close" @click="closePopup">&times;</button>
      </div>
      <div class="popup-body">
        <p><strong>Description:</strong> {{ popupProject.description }}</p>
        <p><strong>Technologies:</strong> {{ popupProject.technologies }}</p>
        <div v-if="popupProject.details" class="popup-details">
          <h3>Additional Details</h3>
          <div class="popup-details-content" v-html="formatDetails(popupProject.details)"></div>
        </div>
      </div>
    </div>
  </div>
  -->
</template>

<script>

import { defineComponent } from 'vue';
// import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'

// console.log(import.meta.env)

export default defineComponent({
name: 'Projects',
components: {
//    RouterView,
RouterLink,
},
data() {
return {
showPopup: false,
popupProject: {
title: '',
description: '',
technologies: '',
status: '',
details: ''
},
popupProjects: [],
loading: true,
// Static projects with routes
staticProjects: [
{
id: 'clarent',
title: 'Clarent',
description: 'A Split, Tented, Columnar, Bistable, Ergonomic Keyboard for Typing & Gaming',
technologies: 'CAD, C++, Kicad',
route: '/projects/clarent',
icon: '/images/clarent_icon.JPG'
},
{
id: 'tripod',
title: 'Tripod',
description: 'An indestructible tripod for recording volleyball',
technologies: 'CAD, FEA (ANSYS)',
route: '/projects/tripod',
icon: '/images/tripod_icon.jpeg'
},
{
id: 'carwennan',
title: 'Carwennan',
description: 'Portable Ergonomic Keyboard (WIP)',
technologies: 'CAD, C++, Kicad',
route: '/projects/carwennan',
icon: '/images/carwennan_icon_1.png'
},
{
id: 'home_automation',
title: 'Home Automation',
description: 'IoT solutions for smart home control and weather monitoring',
technologies: 'Go, Arduino, ESP8266, Docker',
route: '/projects/home_automation',
icon: '/images/home_automation_icon.JPG'
}
]
};
},
computed: {
allProjects() {
return [...this.staticProjects, ...this.popupProjects];
}
},
methods: {
openPopup(projectId) {
const project = this.popupProjects.find(p => p.id === projectId);
if (project) {
this.popupProject = {
title: project.title,
description: project.description,
technologies: project.technologies,
status: project.status,
details: project.details
};
this.showPopup = true;
}
},
closePopup() {
this.showPopup = false;
},
formatDetails(details) {
if (!details) return '';

// Convert line breaks to <br> tags and handle bullet points
let formatted = details
.replace(/\n\n/g, '</p><p>') // Double line breaks = new paragraphs
.replace(/\n/g, '<br>')      // Single line breaks = line breaks
.replace(/• /g, '&bull; ')   // Convert bullet points to HTML entities
.replace(/^/, '<p>')         // Start with opening paragraph tag
.replace(/$/, '</p>');       // End with closing paragraph tag

// Handle image tags - convert [img:filename] or [img:filename:height] to proper img tags
formatted = formatted.replace(/\[img:([^:\]]+)(?::(\d+))?\]/g, (match, filename, height) => {
const heightStyle = height ? `style="height: ${height}px;"` : '';
// Automatically prepend images/ to the path
const imagePath = filename.startsWith('images/') ? filename : `images/${filename}`;
return `<div class="popup-image-container"><img src="/${imagePath}" alt="Project image" class="popup-image" ${heightStyle} /></div>`;
});

return formatted;
}
},
async created() {
try {
const response = await fetch('/popupProjects.json');
this.popupProjects = await response.json();
} catch (error) {
console.error('Error loading popup projects:', error);
// Fallback to empty array if JSON fails to load
this.popupProjects = [];
}
this.loading = false;
},
});
</script>


<style scoped>


.section-headers {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 3;
}

.section-title {
  font-size: 32px;
  margin: 0;
  text-align: center;
  color: var(--color-h1);
  font-weight: 600;
}

.projects-container {
  margin-bottom: 60px;
}

.projects-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-item {
  margin: 0;
  padding: 0;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: var(--color-menu-item);
  border-radius: 8px;
  padding: 8px 8px;
  transition: background-color 100ms ease-out;
  text-decoration: none;
  color: inherit;
}

.project-link:hover {
  background-color: var(--color-menu-item-hover);
}

.project-clickable {
  cursor: pointer;
}

.project-icon {
  width: 160px;
  height: 110px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
}

.project-icon.tripod-icon {
  filter: brightness(0.9);
}

.project-content {
  flex: 1;
  flex-direction: column;
  min-width: 0;
  text-align: left;
}

.project-title {
  font-size: 20px;
  color: var(--color-h2);
  margin: 0 0 8px 0;
  font-weight: 600;
}

.project-description {
  font-size: 14px;
  color: var(--color-text);
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.project-tech {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.3;
}

.loading-message {
  text-align: center;
  padding: 20px;
  color: var(--color-text-muted);
  font-style: italic;
}

@media (max-width: 500px) {
  .hide-on-mobile {
    display: none !important;
  }

  .projects-list {
    gap: 10px;
  }

  .project-link {
    align-items: start; 
    padding: 8px 8px;
  }

  .project-icon {
    width: 100px;
    height: 80px;
  }

  .project-title {
    font-size: 18px;
  }

  .project-description,
  .project-tech {
    font-size: 13px;
  }
}

/* Popup Modal Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.popup-content {
  background-color: var(--color-card-background);
  border-radius: 10px;
  padding: 0;
  width: 80%;
  height: 80%;
  max-width: none;
  max-height: none;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-background-light);
}

/* Dark mode shadow - lighter shadow for dark backgrounds */
.dark-mode .popup-content {
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid var(--color-background-light);
  background-color: var(--color-menu-item);
  border-radius: 10px 10px 0 0;
}

.popup-header h2 {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: 24px;
  font-weight: 600;
}

.popup-close {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.popup-close:hover {
  background-color: var(--color-menu-item-hover);
}

.popup-body {
  padding: 25px;
}

.popup-body p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: var(--color-text);
}

.popup-body strong {
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.popup-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-background-light);
}

.popup-details h3 {
  margin: 0 0 10px 0;
  color: var(--color-text-tertiary);
  font-size: 18px;
  font-weight: 600;
}

.popup-details-content {
  line-height: 1.6;
}

.popup-details-content p {
  margin: 0 0 15px 0;
  color: var(--color-text);
}

.popup-details-content p:last-child {
  margin-bottom: 0;
}

.popup-image-container {
  margin: 15px 0;
  text-align: center;
}

.popup-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-background-light);
  object-fit: contain;
}

/* Fixed height images */
.popup-image[style*="height:"] {
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

.dark-mode .popup-image {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

/* Responsive popup */
@media (max-width: 768px) {
  .popup-content {
    width: 95%;
    height: 90%;
    margin: 20px;
  }

  .popup-header {
    padding: 15px 20px;
  }

  .popup-header h2 {
    font-size: 20px;
  }

  .popup-body {
    padding: 20px;
  }
}

</style>
