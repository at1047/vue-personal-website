<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1>The Secret to Happiness</h1>
      <!--<p style="display: inline; margin-left: 20px;">and volleyball mindset in general</p>-->
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
    // Fetch the markdown file from public/blog_md directory
    this.markdown = await fetchMarkdown('blog_md/setters_mindset');
    this.loading = false;
  },
});
</script>

<style>
  @import '../../assets/markdown.css';


.inverted {
  filter: none;
}

.dark-mode .inverted {
  filter: invert(1) hue-rotate(180deg);
}
</style>
