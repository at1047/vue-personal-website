<template>
  <Breadcrumbs :breadcrumbArr="this.$route.meta" v-if="!loading" />
  <div class="project-header">
    <h2 style="display: inline;">Clarent</h2>
    <p style="display: inline; margin-left: 20px;">A bistable split ergonomic keyboard for gaming</p>
  </div>

  <div class="project-content">

    <div v-html="markdownToHtml" class="markdown"></div>
  </div>
</template>

<script>

import { defineComponent } from "vue";
import { marked } from "marked";
import Breadcrumbs from '../../components/Breadcrumbs.vue';


export default defineComponent({
  name: 'ProjectClarentPage',
  components: { Breadcrumbs },
  data() {
    return {
      markdown: "# TEST",
      loading: true,
    };
  },
  computed: {
    markdownToHtml() {

      const parsedMarkdown = marked.parse(this.markdown)
      const replacedMarkdown = parsedMarkdown.replace(/<p>!\[\[(.*?)\]\]<\/p>/g, (match, filename) => {
        const id = filename.split('.')[0];
        return `<img id="${id}" src="/${filename}" />`;
      });
      return replacedMarkdown
    },
  },
  async created() {
    this.breadCrumbArr = this.$route.meta;
    this.breadCrumbArr['clarent'] = '/projects/Clarent';
    // Fetch the markdown file from public directory
    const response = await fetch('/clarent.md');
    console.log(response)
    this.markdown = await response.text();
    this.loading = false;
  },
});

</script>

<style>
@import '../../assets/projects.css';
</style>
