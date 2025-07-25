<template>
    <Breadcrumbs :breadcrumbArr="this.$route.meta" v-if="this.loading == false"/>
    <div class="blog" v-html="markdownToHtml"></div>
</template>

<script>

import { defineComponent } from "vue";
import { marked } from "marked";
import axios from "axios";
import Breadcrumbs from '../components/Breadcrumbs.vue'

export default defineComponent({
    name: 'ProjectDetailsPage',
    components: {
        Breadcrumbs,
    },
    data(){
        return {
            markdown:  "",
            breadCrumbArr: null,
        };
    },
    async created() {
        try {
            this.markdown = await axios.get("//" + import.meta.env.VITE_API
                + "/blogs/" + this.$route.params.blogName)
            //+ "/blogs/" + "test%20title%201")
    .then((res) => res.data)
    .then((data) => data.content)
        } catch(e) {
            console.error(e);
        };
            this.breadCrumbArr = this.$route.meta
            this.breadCrumbArr[this.$route.params.projectName] = '/projects/'
                  + this.$route.params.projectName
            this.breadCrumbArr[this.$route.params.blogName] = ''
            this.loading = false
        },
  computed: {
    markdownToHtml(){
      return marked(this.markdown);
    }
  }
});

</script>

<style scoped>
.blog {
    width: 800px;
    margin: 50px auto;
}
</style>
