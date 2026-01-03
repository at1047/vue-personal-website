<template>
  <div class="project-container">
  <div class="project-header">
    <h1 style="display: inline;">Clarent</h1>
      <!--<p style="display: inline; margin-left: 20px;" class="hide-on-mobile">A bistable split ergonomic keyboard for gaming</p>-->
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
  name: 'ProjectClarentEngineeringDecisionsPage',
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
    this.breadCrumbArr['clarent'] = '/projects/Clarent';
    this.breadCrumbArr['clarent_engineering_decisions'] = '/projects/Clarent/clarent_engineering_decisions';
    // Fetch the markdown file from public/projects_md directory
    this.markdown = await fetchMarkdown('projects_md/clarent_engineering_decisions');
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
  filter: invert(1) hue-rotate(180deg);;
}

</style>
