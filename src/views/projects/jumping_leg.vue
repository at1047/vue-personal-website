<template>
  <div class="project-container">
  <div class="project-header">
    <h1>Jumping Robotic Leg</h1>
      <p class="markdown-description"><em>Collaborators: Jason Abi Chebli, Samantha Friedman, Carlos Goni Gil</em></p>
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
  name: 'ProjectJumpingLegPage',
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
    this.markdown = await fetchMarkdown('projects_md/jumping_leg');
    this.loading = false;
    triggerScroll();
  },
});

</script>

<style>
  @import '../../assets/markdown.css';

  #ezgif-69aa3ef2b5144262 {
    width: 70%;
    margin: 10px auto 20px;
  }

</style>
