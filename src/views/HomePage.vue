<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <!-- Terminal-style greeting -->
          <div class="hero-greeting mono">
            <span class="greeting-prompt">$</span>
            <span class="greeting-cmd">whoami</span>
          </div>
          
          <h1 class="hero-name">Andrew Tai</h1>
          
          <p class="hero-title">Robotics Engineer</p>
          
          <p class="hero-description">
            I bridge the gap between mechanical engineering and production software. From quadrotor research at UC Berkeley to ergonomic input devices to purpose-built developer tools, my work focuses on engineering discipline and long-term maintainability.
          </p>
          
          <!-- Quick links styled like terminal commands -->
          <div class="hero-links">
            <router-link to="/projects" class="hero-link">
              <span class="link-arrow">→</span>
              <span class="link-text">View Projects</span>
            </router-link>
            <a href="https://github.com/at1047" target="_blank" rel="noopener" class="hero-link hero-link-external">
              <span class="link-arrow">↗</span>
              <span class="link-text">GitHub</span>
            </a>
          </div>
        </div>
        
        <!-- ASCII/Canvas element -->
        <div class="hero-visual">
          <Cube id="canvas"></Cube>
        </div>
      </div>
    </section>
    
    <!-- Featured Projects Section -->
    <section class="section featured-section">
      <div class="section-header">
        <h2 class="section-title">Featured Work</h2>
        <router-link to="/projects" class="section-link">
          All projects <span class="arrow">→</span>
        </router-link>
      </div>
      
      <div class="featured-grid">
        <router-link 
          v-for="project in featuredProjects" 
          :key="project.id"
          :to="project.route"
          class="project-card"
        >
          <div class="card-image-wrapper">
            <img 
              :src="project.icon" 
              :alt="project.title"
              class="card-image"
              loading="lazy"
            />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-description">{{ project.description }}</p>
            <div class="card-tech">
              <span 
                v-for="tech in project.techList" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
    
    <!-- Skills/Focus Areas -->
    <section class="section skills-section">
      <h2 class="section-title">Areas of Focus</h2>
      
      <div class="skills-grid">
        <div class="skill-card" v-for="skill in skills" :key="skill.title">
          <div class="skill-icon">{{ skill.icon }}</div>
          <h3 class="skill-title">{{ skill.title }}</h3>
          <p class="skill-description">{{ skill.description }}</p>
        </div>
      </div>
    </section>
    
    <!-- Status/Currently Section -->
    <section class="section status-section">
      <div class="status-card">
        <div class="status-header">
          <span class="status-indicator"></span>
          <span class="status-label mono">Currently</span>
        </div>
        <p class="status-text">
          Working on custom ergonomic keyboards, robotics control systems, and home automation infrastructure.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cube from '../components/Cube.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Cube,
  },
  data() {
    return {
      featuredProjects: [
        {
          id: 'clarent',
          title: 'Clarent',
          description: 'Split, tented, columnar ergonomic keyboard with bistable mechanism for gaming',
          route: '/projects/clarent',
          icon: '/images/clarent_icon.jpg',
          techList: ['CAD', 'KiCad', 'C++']
        },
        {
          id: 'jumping_leg',
          title: 'Jumping Leg',
          description: 'Robotic leg using Input-Output Linearization control for dynamic jumping',
          route: '/projects/jumping_leg',
          icon: '/images/jumping_leg_icon.png',
          techList: ['Controls', 'Dynamics', 'Simulation']
        },
        {
          id: 'home_automation',
          title: 'Home Automation',
          description: 'IoT infrastructure for smart home control and environmental monitoring',
          route: '/projects/home_automation',
          icon: '/images/home_automation_icon.jpg',
          techList: ['Go', 'Docker', 'ESP8266']
        }
      ],
      skills: [
        {
          icon: '⚙',
          title: 'Controls & Dynamics',
          description: 'State estimation, trajectory optimization, nonlinear control design'
        },
        {
          icon: '◈',
          title: 'Mechanical Design',
          description: 'CAD, FEA, DFM, mechanism design, custom keyboards'
        },
        {
          icon: '▣',
          title: 'Embedded Systems',
          description: 'Firmware development, sensor integration, real-time systems'
        },
        {
          icon: '⬡',
          title: 'Software Engineering',
          description: 'Systems programming, APIs, simulation, developer tools'
        }
      ]
    }
  }
});
</script>

<style scoped>
.home {
  padding-bottom: var(--space-16);
}

/* --- HERO SECTION --- */
.hero {
  padding: var(--space-12) 0 var(--space-16);
  border-bottom: 1px solid var(--color-border-subtle);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-10);
  align-items: center;
}

.hero-text {
  max-width: 520px;
}

.hero-greeting {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
}

.greeting-prompt {
  color: var(--color-accent-primary);
}

.greeting-cmd {
  color: var(--color-text-muted);
}

.hero-name {
  font-size: var(--text-4xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
  line-height: 1.1;
}

.hero-title {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  letter-spacing: 0.02em;
}

.hero-description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

.highlight {
  color: var(--color-text-primary);
  font-weight: 500;
}

.hero-links {
  display: flex;
  gap: var(--space-4);
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.hero-link:hover {
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border-color: var(--color-text-primary);
}

.hero-link .link-arrow {
  color: var(--color-accent-primary);
  transition: transform var(--transition-fast);
}

.hero-link:hover .link-arrow {
  transform: translateX(2px);
  color: var(--color-bg-primary);
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- SECTIONS --- */
.section {
  padding: var(--space-12) 0;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-h2);
}

.section-link {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.section-link:hover {
  color: var(--color-text-primary);
  background: transparent;
}

.section-link .arrow {
  transition: transform var(--transition-fast);
}

.section-link:hover .arrow {
  transform: translateX(3px);
}

/* --- FEATURED PROJECTS GRID --- */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.project-card {
  display: flex;
  flex-direction: column;
  background: var(--color-card-background);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
}

.project-card:hover {
  border-color: var(--color-border);
  background: var(--color-card-background-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--color-shadow);
}

.card-image-wrapper {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .card-image {
  transform: scale(1.02);
}

.card-content {
  padding: var(--space-4);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-h3);
  margin-bottom: var(--space-2);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-3);
  flex: 1;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

/* --- SKILLS GRID --- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.skill-card {
  padding: var(--space-5);
  background: var(--color-card-background);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.skill-card:hover {
  border-color: var(--color-border);
}

.skill-icon {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-3);
  color: var(--color-accent-primary);
}

.skill-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-h3);
  margin-bottom: var(--space-2);
}

.skill-description {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

/* --- STATUS SECTION --- */
.status-section {
  border-top: 1px solid var(--color-border-subtle);
}

.status-card {
  padding: var(--space-5);
  background: var(--color-card-background);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-accent-success);
}

.status-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: var(--color-accent-success);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

/* --- RESPONSIVE --- */
@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  
  .hero-visual {
    order: -1;
    justify-content: flex-start;
  }
  
  .hero-text {
    max-width: none;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: var(--space-8) 0 var(--space-10);
  }
  
  .featured-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-links {
    flex-direction: column;
  }
  
  .hero-link {
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: var(--space-2);
  }
}

@media (max-width: 500px) {
  .hero-visual {
    display: none;
  }
}

/* Utility */
.mono {
  font-family: var(--font-mono);
}
</style>
