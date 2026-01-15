<template>
  <div class="app-container">
    <transition name="slide">
      <SlideMenu v-show="showSlideMenu" v-on:close-slide="closeSlideMenu()"></SlideMenu>
    </transition>
    
    <!-- Navigation Bar -->
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <!-- Left: Breadcrumbs with terminal aesthetic -->
        <div class="nav-section nav-left">
          <Breadcrumbs :breadcrumbArr="breadcrumbArr" />
        </div>
        
        <!-- Center: Main navigation links -->
        <div class="nav-section nav-center">
          <router-link 
            v-for="link in navLinks" 
            :key="link.to"
            :to="link.to" 
            class="nav-link"
            :class="{ 'nav-link-active': isActiveRoute(link.to) }"
          >
            <span class="nav-link-text">{{ link.label }}</span>
          </router-link>
        </div>
        
        <!-- Right: External links and theme toggle -->
        <div class="nav-section nav-right">
          <a 
            class="nav-icon-link" 
            href="https://github.com/at1047" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <font-awesome-icon icon="fa-brands fa-github" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
    
    <!-- Nav underline with subtle gradient accent -->
    <div class="nav-border"></div>
    
    <!-- Main content area -->
    <main class="main-content">
      <div class="main-content-inner">
        <RouterView />
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-text">© {{ currentYear }} Andrew Tai</span>
        <span class="footer-separator">·</span>
        <span class="footer-text mono">Built with precision</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import SlideMenu from './components/SlideMenu.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    RouterLink,
    SlideMenu,
    ThemeToggle,
    Breadcrumbs,
  },
  data() {
    return {
      showSlideMenu: false,
      contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
      navLinks: [
        { to: '/', label: 'Home', key: 'H' },
        { to: '/projects', label: 'Projects', key: 'P' },
        { to: '/blog', label: 'Blog', key: 'B' },
      ]
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    mailtoHref() {
      return this.contactEmail ? `mailto:${this.contactEmail}` : 'mailto:';
    },
    breadcrumbArr() {
      const route = this.$route;
      const base = { home: '/'};
      let lastKey = '';

      if (
        route.name === 'Projects' || 
        (typeof route.name === 'string' && route.name.startsWith('Project'))
      ) {
        const segments = route.path.split('/').filter(Boolean);

        if (segments.length >= 3) {
          const parentPath = '/' + segments.slice(0, -1).join('/');
          base['...'] = parentPath;
          const lastSegment = segments[segments.length - 1];
          base[lastSegment] = route.path;
        } else {
          Object.assign(base, route.meta || {});
          let currentPath = '';
          segments.forEach(segment => {
            currentPath += `/${segment}`;
            if (!Object.prototype.hasOwnProperty.call(base, segment)) {
              base[segment] = currentPath; 
            }
          });
        }
      } 
      else if (route.name === 'Blog') {
        Object.assign(base, route.meta || {});
        lastKey = 'blog';
      } else if (typeof route.name === 'string' && route.name.startsWith('Blog')) {
        Object.assign(base, route.meta || {});
        const segments = route.path.split('/').filter(Boolean);
        lastKey = segments[segments.length - 1] || '';
      } else if (route.name === 'Recipes') {
        Object.assign(base, route.meta || {});
        lastKey = 'recipes';
      } 
      else if (route.name === 'Home') {
        Object.assign(base, route.meta || {});
        lastKey = 'home';
      }

      if (lastKey && !Object.prototype.hasOwnProperty.call(base, lastKey)) {
        base[lastKey] = route.path;
      }

      return base;
    }
  },
  mounted() {
    // Keyboard navigation for power users
    document.addEventListener('keydown', this.handleKeyboardNav);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardNav);
  },
  methods: {
    handleKeyboardNav(e) {
      // Only trigger with Alt/Option key to avoid conflicts
      if (!e.altKey || e.ctrlKey || e.metaKey) return;
      
      const key = e.key.toUpperCase();
      const link = this.navLinks.find(l => l.key === key);
      
      if (link && this.$route.path !== link.to) {
        e.preventDefault();
        this.$router.push(link.to);
      }
    },
    isActiveRoute(path) {
      if (path === '/') {
        return this.$route.path === '/';
      }
      return this.$route.path.startsWith(path);
    },
    openSlideMenu() {
      this.$emit('open-slide');
      this.showSlideMenu = true;
    },
    closeSlideMenu() {
      this.showSlideMenu = false;
    }
  },
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* --- NAVIGATION --- */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-nav);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-6);
  height: 56px;
}

.nav-section {
  display: flex;
  align-items: center;
}

.nav-left {
  flex: 1;
  min-width: 0;
}

.nav-center {
  display: flex;
  gap: var(--space-1);
}

.nav-right {
  flex: 1;
  justify-content: flex-end;
  gap: var(--space-6);
}

/* Navigation links */
.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-hover-bg);
}

.nav-link-active {
  color: var(--color-text-primary);
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--space-3);
  right: var(--space-3);
  height: 2px;
  background-color: var(--color-accent-primary);
  border-radius: 1px;
}

/* Icon links - match ThemeToggle styling */
.nav-icon-link,
.nav-icon-link:visited {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--text-xl);
  background: transparent;
  transition: all var(--transition-fast);
}

.nav-icon-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-hover-bg);
}

/* Nav border */
.nav-border {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-border) 20%,
    var(--color-border) 80%,
    transparent
  );
}

/* --- MAIN CONTENT --- */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-content-inner {
  flex: 1;
  width: min(800px, calc(100% - 2rem));
  margin: 1rem auto;
  min-height: 100px; /* Ensure container has minimum height */
}

/* Ensure child views are visible */
.main-content-inner > * {
  display: block;
}

/* --- FOOTER --- */
.footer {
  margin-top: auto;
  padding: var(--space-6) var(--space-4);
  border-top: 1px solid var(--color-border-subtle);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.footer-text {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.footer-text.mono {
  font-family: var(--font-mono);
}

.footer-separator {
  color: var(--color-text-faint);
}

/* --- TRANSITIONS --- */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* --- RESPONSIVE --- */
@media (max-width: 800px) {
  .nav-inner {
    padding: var(--space-3) var(--space-4);
  }
  
  .nav-left {
    display: none;
  }
  
  .nav-center {
    flex: 1;
    justify-content: center;
  }
  
  .nav-right {
    flex: 0;
  }
}

@media (max-width: 500px) {
  .nav-link {
    padding: var(--space-2);
    font-size: var(--text-xs);
  }
  
  .nav-right {
    gap: var(--space-3);
  }
  
  .nav-icon-link {
    width: 32px;
    height: 32px;
    font-size: var(--text-lg);
  }
}
</style>
