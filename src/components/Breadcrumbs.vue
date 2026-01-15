<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li 
        v-for="(value, key, idx) in breadcrumbArr" 
        :key="key"
        class="breadcrumb-item"
      >
        <!-- Separator (not for first item) -->
        <span v-if="idx !== 0" class="breadcrumb-separator" aria-hidden="true">/</span>
        
        <!-- Link (not last item) -->
        <router-link 
          v-if="idx !== Object.keys(breadcrumbArr).length - 1"
          :to="value"
          class="breadcrumb-link"
        >
          <span class="breadcrumb-text">{{ formatKey(key) }}</span>
        </router-link>
        
        <!-- Current page (last item) -->
        <span 
          v-else 
          class="breadcrumb-current"
          aria-current="page"
        >
          {{ formatKey(key) }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumbs',
  props: ['breadcrumbArr'],
  components: {
    RouterLink,
  },
  methods: {
    formatKey(key) {
      if (key === 'home') return '~';
      if (key === '...') return '..';
      return key;
    }
  }
});
</script>

<style scoped>
.breadcrumbs {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none !important;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
  overflow: hidden;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  list-style: none !important;
}

.breadcrumb-separator {
  margin: 0 var(--space-2);
  color: var(--color-text-faint);
  user-select: none;
}

.breadcrumb-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-1) 0;
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-text-primary);
  background-color: transparent;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.breadcrumb-text {
  font-size: inherit;
  color: inherit;
}

.breadcrumb-current {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

/* Truncate long breadcrumbs on small screens */
@media (max-width: 600px) {
  .breadcrumbs {
    font-size: var(--text-xs);
  }
  
  .breadcrumb-separator {
    margin: 0 var(--space-1);
  }
}
</style>
