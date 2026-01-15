<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="isLightMode ? 'Switch to dark mode' : 'Switch to light mode'"
    :title="isLightMode ? 'Switch to dark mode (Alt+D)' : 'Switch to light mode (Alt+D)'"
  >
    <span class="toggle-icon">
      <font-awesome-icon 
        :icon="isLightMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'" 
        class="theme-icon" 
      />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThemeToggle',
  data() {
    return {
      isLightMode: true
    };
  },
  mounted() {
    // Check for saved theme preference or system preference, default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      this.isLightMode = true;
      document.body.classList.remove('dark-mode');
    } else if (savedTheme === 'dark' || prefersDark) {
      this.isLightMode = false;
      document.body.classList.add('dark-mode');
    } else {
      // Default to dark mode for engineering aesthetic
      this.isLightMode = false;
      document.body.classList.add('dark-mode');
    }
    
    // Add keyboard shortcut listener
    document.addEventListener('keydown', this.handleKeyboard);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard);
  },
  methods: {
    handleKeyboard(e: KeyboardEvent) {
      // Alt+D to toggle theme
      if (e.altKey && e.key.toUpperCase() === 'D') {
        e.preventDefault();
        this.toggleTheme();
      }
    },
    toggleTheme() {
      this.isLightMode = !this.isLightMode;
      
      if (this.isLightMode) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    }
  }
});
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  color: var(--color-text-primary);
  background-color: var(--color-hover-bg);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-icon {
  font-size: var(--text-lg);
  transition: transform var(--transition-base);
}

.theme-toggle:hover .theme-icon {
  transform: rotate(15deg);
}

@media (max-width: 500px) {
  .theme-toggle {
    width: 32px;
    height: 32px;
  }
  
  .theme-icon {
    font-size: var(--text-base);
  }
}
</style>
