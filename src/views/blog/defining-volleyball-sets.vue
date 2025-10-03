<template>
  <div class="project-container">
    <div class="project-header">
      <h1 style="display: inline;">Defining Volleyball Sets</h1>
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
  name: 'BlogDefiningVolleyballSetsPage',
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
    // Fetch the markdown file from public/blog directory
    this.markdown = await fetchMarkdown('blog/Defining Volleyball Sets');
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
