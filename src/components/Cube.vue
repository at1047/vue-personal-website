<template>
  <pre 
    id="canvas" 
    ref="canvas" 
    class="cube-canvas"
    aria-hidden="true"
  ></pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// @ts-ignore
import { main } from '/public/cube.js';

export default defineComponent({
  name: 'Cube',
  components: {},
  mounted
});

function mounted() {
  main()
}
</script>

<style scoped>
.cube-canvas {
  /* Typography - sized to fit 30x16 character grid */
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.2;
  color: var(--color-text-muted);
  
  /* Layout */
  margin: 0;
  padding: var(--space-2);
  
  /* Visual styling */
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  
  /* Ensure proper character alignment */
  white-space: pre;
  overflow: hidden;
  
  /* Subtle hover effect */
  transition: border-color var(--transition-slow);
}

.cube-canvas:hover {
  border-color: var(--color-border);
}

@media (max-width: 700px) {
  .cube-canvas {
    font-size: 10px;
  }
}
</style>
