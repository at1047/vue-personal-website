<template>
  <div class="project-container">
  <div class="project-header" style="display: flex; flex-direction: column; align-items: flex-start;">
    <h1>My <em>Indestructible</em> Tripod</h1>

    <p>My solution for tripods breaking when recording volleyball sessions</p>
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

.tinted {
  filter: none;
}

.dark-mode .tinted {
  /* filter: invert(0.8) hue-rotate(180deg) brightness(1.5) contrast(0.9); */
  filter: invert(15%) brightness(0.9) contrast(90%);
}

.project-header h1 {
  margin-bottom: 0;
}

.project-header p {
  margin-top: 0;
}

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
