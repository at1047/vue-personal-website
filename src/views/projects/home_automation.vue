<template>
  <div class="project-container">
  <div class="project-header" style="display: flex; flex-direction: column; align-items: flex-start;">
    <h1 style="display: inline;">Home Automation</h1>
  </div>

  <div class="project-content">

    <div v-html="markdownToHtml" class="markdown"></div>
  </div>
</div>
</template>

<script>

import { defineComponent } from "vue";
import { markdownToHtml, fetchMarkdown } from '../../utils/markdownUtils.js';


export default defineComponent({
  name: 'ProjectHomeAutomationPage',
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
    this.breadCrumbArr['home_automation'] = '/projects/Home_Automation';
    // Fetch the markdown file from public/projects_md directory
    this.markdown = await fetchMarkdown('projects_md/home_automation');
    this.loading = false;
  },
});

</script>

<style>
  @import '../../assets/markdown.css';
</style>

<style scoped>
.inverted {
  filter: none;
}

.dark-mode .inverted {
  filter: invert(1) hue-rotate(180deg);
}

</style>
