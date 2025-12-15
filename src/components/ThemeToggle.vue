<template>
  <button @click="toggleTheme" class="theme-toggle" :class="{ 'light-mode': isLightMode }">
    <font-awesome-icon :icon="isLightMode ? 'fa-solid fa-moon' : 'fa-regular fa-sun'" class="theme-icon" />
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
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isLightMode = true;
      document.body.classList.remove('dark-mode');
    } else {
      // Default to dark mode
      this.isLightMode = false;
      document.body.classList.add('dark-mode');
    }
  },
  methods: {
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
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.5s ease-in-out;
  color: var(--color-text);
  font-size: 24px;
  padding: 0;
  margin: 0;
}

.theme-toggle:hover {
  cursor: pointer;
}

.theme-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(180deg);
}
</style>
