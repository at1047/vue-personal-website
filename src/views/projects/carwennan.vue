<template>
  <div class="project-header">
    <h2 style="display: inline;">Carwennan</h2>
    <p style="display: inline; margin-left: 20px;">A bistable split ergonomic keyboard for gaming</p>
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

#clarent_3 {
  height: 270px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>
