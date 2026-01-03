<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1>Defining Volleyball Sets</h1>
    </div>

    <div class="blog-content">
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
    // Fetch the markdown file from public/blog_md directory
    this.markdown = await fetchMarkdown('blog_md/Defining Volleyball Sets');
    this.loading = false;
  },
});
</script>

<style>
  @import '../../assets/markdown.css';
</style>

<style scoped>
#combined_traj {
  width: 100%;
  display: block;
}

.inverted {
  filter: none;
}

.dark-mode .inverted {
  filter: invert(1) hue-rotate(180deg);
}
</style>
