<template>
  <div class="projects-page">
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">Projects</h1>
      <p class="page-description">
        A collection of hardware and software projects — keyboards, robotics, embedded systems, and tools.
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <span class="loading-text mono">Loading projects...</span>
    </div>

    <!-- Projects List -->
    <div class="projects-list">
      <template v-for="project in allProjects" :key="project.id">
        <router-link 
          v-if="project.route"
          :to="project.route" 
          class="project-item"
        >
        <!-- Project Image -->
        <div class="project-image-wrapper">
          <img 
            v-if="project.icon" 
            :src="project.icon" 
            :alt="project.title + ' preview'" 
            class="project-image"
            loading="lazy"
          />
          <div v-else class="project-image-placeholder">
            <span class="placeholder-icon">◈</span>
          </div>
        </div>
        
        <!-- Project Content -->
        <div class="project-content">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-description">{{ project.description }}</p>
          
          <!-- Tech Stack -->
          <div class="project-meta">
            <div class="tech-list" v-if="project.technologies">
              <span 
                v-for="tech in parseTech(project.technologies)" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </router-link>
      </template>
    </div>
    
    <!-- Empty State -->
    <div v-if="!loading && allProjects.length === 0" class="empty-state">
      <p class="empty-text">No projects found.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Projects',
  components: {
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
      staticProjects: [
        {
          id: 'clarent',
          title: 'Clarent',
          description: 'A split, tented, columnar ergonomic keyboard with a bistable mechanism designed for both typing and gaming',
          technologies: 'CAD, C++, KiCad, PCB Design',
          route: '/projects/clarent',
          icon: '/images/clarent_icon.jpg'
        },
        {
          id: 'jumping_leg',
          title: 'Jumping Leg',
          description: 'A jumping robotic leg using Input-Output Linearization control for dynamic locomotion',
          technologies: 'Controls, Dynamics, Simulation, MATLAB',
          route: '/projects/jumping_leg',
          icon: '/images/jumping_leg_icon.png'
        },
          {
            id: 'tripod',
            title: 'Tripod',
            description: 'An indestructible camera tripod designed for recording volleyball matches with FEA-validated durability',
            technologies: 'CAD, FEA (ANSYS), DFM',
            route: '/projects/tripod',
            icon: '/images/tripod_icon.jpeg'
          },
          // {
          //   id: '3d_printing',
          //   title: '3D Printing',
          //   description: 'A collection of 3D printing projects',
          //   technologies: 'CAD, 3D Printing',
          //   route: '/projects/3d_printing',
          //   icon: '/images/3d_printing_icon.jpg'
          // },
        {
          id: 'carwennan',
          title: 'Carwennan',
          description: 'A portable ergonomic keyboard optimized for travel without compromising on split layout',
          technologies: 'CAD, C++, KiCad',
          route: '/projects/carwennan',
          icon: '/images/carwennan_icon_1.png'
        },
        {
          id: 'home_automation',
          title: 'Home Automation',
          description: 'IoT infrastructure for smart home control, weather monitoring, and environmental sensing',
          technologies: 'Go, Arduino, ESP8266, Docker',
          route: '/projects/home_automation',
          icon: '/images/home_automation_icon.jpg'
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
    parseTech(techString) {
      if (!techString) return [];
      return techString.split(',').map(t => t.trim()).filter(t => t);
    },
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
      let formatted = details
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/• /g, '&bull; ')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
      formatted = formatted.replace(/\[img:([^:\]]+)(?::(\d+))?\]/g, (match, filename, height) => {
        const heightStyle = height ? `style="height: ${height}px;"` : '';
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
      this.popupProjects = [];
    }
    this.loading = false;
  },
});
</script>

<style scoped>
.projects-page {
  padding-bottom: var(--space-16);
}

/* --- PAGE HEADER --- */
.page-header {
  padding: var(--space-4) 0 var(--space-3);
  border-bottom: 1px solid var(--color-border-subtle);
  margin-bottom: var(--space-6);
}

.page-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-h1);
  margin-bottom: var(--space-2);
}

.page-description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  max-width: 800px;
  line-height: var(--leading-relaxed);
}

/* --- LOADING STATE --- */
.loading-state {
  padding: var(--space-12) 0;
  text-align: center;
}

.loading-text {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

/* --- PROJECTS LIST --- */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.project-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-card-background);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  align-items: center;
}

.project-item:hover {
  border-color: var(--color-border);
  background: var(--color-card-background-hover);
}

/* --- PROJECT IMAGE --- */
.project-image-wrapper {
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-item:hover .project-image {
  transform: scale(1.03);
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
}

.placeholder-icon {
  font-size: var(--text-3xl);
  color: var(--color-text-faint);
}

/* --- PROJECT CONTENT --- */
.project-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.project-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-h2);
  margin: 0;
  line-height: var(--leading-tight);
}

.project-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin: 0;
}

/* --- PROJECT META --- */
.project-meta {
  margin-top: var(--space-1);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.project-item:hover .tech-tag {
  border-color: var(--color-border);
}

/* --- EMPTY STATE --- */
.empty-state {
  padding: var(--space-12) 0;
  text-align: center;
}

.empty-text {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

/* --- RESPONSIVE --- */
@media (max-width: 600px) {
  .project-item {
    grid-template-columns: 100px 1fr;
    gap: var(--space-2);
  }
  
  .project-title {
    font-size: var(--text-base);
  }
  
  .project-description {
    font-size: var(--text-xs);
  }
}

@media (max-width: 450px) {
  .project-item {
    grid-template-columns: 80px 1fr;
  }
  
  .project-image-wrapper {
    aspect-ratio: 1/1;
  }
  
  .page-header {
    padding: var(--space-3) 0 var(--space-2);
  }
  
  .page-title {
    font-size: var(--text-2xl);
  }
}

/* Utility */
.mono {
  font-family: var(--font-mono);
}
</style>
