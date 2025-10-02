<template>
  <div class="project-header">
    <h2 style="display: inline;">My <em>Indestructible</em> Tripod</h2>
    <p style="display: inline; margin-left: 20px;">My solution for tripods breaking when recording volleyball sessions</p>
  </div>

  <div class="project-content">

    <div v-html="markdownToHtml" class="markdown"></div>
  </div>
</template>

<script>

import { defineComponent } from "vue";
import { markdownToHtml, fetchMarkdown } from '../../utils/markdownUtils.js';


export default defineComponent({
  name: 'ProjectTripodPage',
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
    this.breadCrumbArr['tripod'] = '/projects/Tripod';
    // Fetch the markdown file from public/projects directory
    this.markdown = await fetchMarkdown('projects/tripod');
    this.loading = false;
  },
});

</script>

<style>
@import '../../assets/projects.css';

#d73a66f5-5536-4363-82bb-1d1d7d1bb1a6 {
  width: 600px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#tripod_2 {
  display: block;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}

#tripod_1 {
  width: 1000px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}



</style>
