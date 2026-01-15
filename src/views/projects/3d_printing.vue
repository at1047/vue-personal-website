<template>
  <div class="project-container">
  <div class="project-header">
    <h1>3D Printing</h1>
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
import { triggerScroll } from '@/utils/scrollResolver';

export default defineComponent({
  name: 'Project3DPrintingPage',
  components: { },
  data() {
    return {
      markdown: "",
      loading: true,
    };
  },
  computed: {
    markdownToHtml() {
      return markdownToHtml(this.markdown, "projects");
    },
  },
  async created() {
    console.log("debug")
    console.log(this.$route.meta)
    // this.breadCrumbArr = this.$route.meta;
    // this.breadCrumbArr['clarent'] = '/projects/Clarent';
    // Fetch the markdown file from public/projects_md directory
    this.markdown = await fetchMarkdown('projects_md/3d_printing');
    this.loading = false;
    triggerScroll();
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
