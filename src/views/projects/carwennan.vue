<template>
  <div class="project-header">
    <h1 style="display: inline;">Carwennan</h1>
  </div>

  <div class="project-content">

    <div v-html="markdownToHtml" class="markdown"></div>
  </div>
</template>

<script>

import { defineComponent } from "vue";
import { markdownToHtml, fetchMarkdown } from '../../utils/markdownUtils.js';


export default defineComponent({
  name: 'ProjectCarwennanPage',
  components: { },
  data() {
    return {
      markdown: "",
      loading: true,
    };
  },
  computed: {
    markdownToHtml() {
      return markdownToHtml(this.markdown);
    },
  },
  async created() {
    this.breadCrumbArr = this.$route.meta;
    this.breadCrumbArr['carwennan'] = '/projects/Carwennan';
    // Fetch the markdown file from public/projects_md directory
    this.markdown = await fetchMarkdown('projects_md/carwennan');
    this.loading = false;
  },
});

</script>

<style>
@import '../../assets/projects.css';

.inverted {
  filter: none;
}

.dark-mode .inverted {
  filter: invert(1) hue-rotate(180deg);
}

</style>
