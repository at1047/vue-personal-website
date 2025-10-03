<template>
  <div class="project-container">
    <div class="project-header">
      <h1 style="display: inline;">A Setter's Mindset</h1>
      <p style="display: inline; margin-left: 20px;">and volleyball mindset in general</p>
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
  name: 'BlogSettersMindsetPage',
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
    this.breadCrumbArr['setters-mindset'] = '/blog/A Setter\'s Mindset, and volleyball mindset in general';
    // Fetch the markdown file from public/blog directory
    this.markdown = await fetchMarkdown('blog/A Setter\'s Mindset, and volleyball mindset in general');
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
