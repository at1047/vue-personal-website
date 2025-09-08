<template>
  <Breadcrumbs :breadcrumbArr="this.$route.meta" v-if="!loading" />
  <div class="project-header">
    <h2 style="display: inline;">Home Automation</h2>
    <p style="display: inline; margin-left: 20px;">IoT solutions for smart home control and weather monitoring</p>
  </div>

  <div class="project-content">

    <div v-html="markdownToHtml" class="markdown"></div>
  </div>
</template>

<script>

import { defineComponent } from "vue";
import { markdownToHtml, fetchMarkdown } from '../../utils/markdownUtils.js';
import Breadcrumbs from '../../components/Breadcrumbs.vue';


export default defineComponent({
  name: 'ProjectHomeAutomationPage',
  components: { Breadcrumbs },
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
    this.breadCrumbArr['home_automation'] = '/projects/Home_Automation';
    // Fetch the markdown file from public directory
    this.markdown = await fetchMarkdown('home_automation');
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

</style>
