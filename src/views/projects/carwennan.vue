<template>
  <Breadcrumbs :breadcrumbArr="this.$route.meta" v-if="!loading" />
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
import { marked } from "marked";
import Breadcrumbs from '../../components/Breadcrumbs.vue';


export default defineComponent({
  name: 'ProjectCarwennanPage',
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
        console.log(filename)
        const [fullname, extensionandclass] = filename.split('.');
        console.log(`fullname: ${fullname}, extension: ${extensionandclass}`)
        const [extension, classname] = extensionandclass.split('#');
        console.log(`${fullname}.${extension}, ${classname}`)
        return `<img id="${fullname}" class="${classname}" src="/${fullname}.${extension}" />`;
      });
      return replacedMarkdown
    },
  },
  async created() {
    this.breadCrumbArr = this.$route.meta;
    this.breadCrumbArr['carwennan'] = '/projects/Carwennan';
    // Fetch the markdown file from public directory
    const response = await fetch('/carwennan.md');
    console.log(response)
    this.markdown = await response.text();
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
