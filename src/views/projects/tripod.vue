<template>
  <Breadcrumbs :breadcrumbArr="this.$route.meta" v-if="!loading" />
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
import { marked } from "marked";
import Breadcrumbs from '../../components/Breadcrumbs.vue';


export default defineComponent({
  name: 'ProjectTripodPage',
  components: { Breadcrumbs },
  data() {
    return {
      markdown: "",
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
    this.breadCrumbArr['tripod'] = '/projects/Tripod';
    // Fetch the markdown file from public directory
    const response = await fetch('/tripod.md');
    console.log(response)
    this.markdown = await response.text();
    this.loading = false;
  },
});

</script>

<style>
@import '../../assets/projects.css';
</style>
