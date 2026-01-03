<template>
  <div class="project-container">
  <div class="project-header" style="display: flex; flex-direction: column; align-items: flex-start;">
    <h1>Indestructible Tripod</h1>
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
    // Fetch the markdown file from public/projects_md directory
    this.markdown = await fetchMarkdown('projects_md/tripod');
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

/*
.project-header h1 {
  margin-bottom: 0;
}

.project-header p {
  margin-top: 0;
}
*/

img {
  border-radius: 5px;
}

#tripod_icon {
  width: 75%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#tripod_2 {
  display: block;
  width: 50%;
  margin: 20px auto;
}

#tripod_1 {
  width: 100%;
  display: block;
  margin: 20px auto;
}



</style>
