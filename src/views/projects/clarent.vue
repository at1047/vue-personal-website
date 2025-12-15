<template>
  <div class="project-container">
  <div class="project-header">
    <h1 style="display: inline;">Clarent</h1>
    <p style="display: inline; margin-left: 20px;" class="hide-on-mobile">A bistable split ergonomic keyboard for gaming</p>
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
  name: 'ProjectClarentPage',
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
    // Fetch the markdown file from public/projects_md directory
    this.markdown = await fetchMarkdown('projects_md/clarent');
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
  filter: invert(1) hue-rotate(180deg);;
}

#ezgif-1306001d1e5c97 {
  border-radius: 5px;
  margin-bottom: 10px;
}

#Gemini_Generated_Image_lrn9ehlrn9ehlrn9_transparent {
  width: 100%;
  filter: var(--color-icon-filter);
}

#clarent_3 {
  height: 270px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#clarent_4 {
  width: 400px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#clarent_5 {
  width: 400px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>
