<template>
  <h2>Editor</h2>
  <div class="tab-container">
    <button v-on:click="toTextArea">Editor</button>
    <button v-on:click="toMarkdown">Preview</button>
  </div>
  <textarea v-if="isEdit == true" v-model="markdown"></textarea>
  <div v-if="!isEdit" v-html="markdownToHtml"></div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { marked } from "marked";
import axios from "axios";

export default defineComponent({
    name: 'EditorMarkdownPage',
    props: {
    },
    components: {
    },
    data(){
        return {
            markdown:  "",
            isEdit: true,
        };
    },
    async created() {
        try {
            this.markdown = await axios.get("//" + import.meta.env.VITE_API
                + "/blogs/the-problem")
            //+ "/blogs/" + "test%20title%201")
            .then((res) => res.data)
            .then((data) => data.content)
        } catch(e) {
                console.error(e);
        };
    },
    computed: {
      markdownToHtml(){
        return marked(this.markdown);
      }
    },
    methods: {
      toTextArea: function (event: Event) {
        this.isEdit = true;
      },
      toMarkdown: function (event: Event) {
        this.isEdit = false;
      }
    }
});
</script>

<style scoped>
textarea {
  font-family: Menlo, Monaco;
  width: 100%;
  height: 60vh;
  font-size: 13px;
  background: var(--color-background-light);
  color: #A1A1A1;
  border:none;
  padding: 5px 10px
}

textarea:focus {
outline-offset: 0px !important;
outline: none !important;
}

.tab-container {
  padding-bottom: 10px;
}


button {
  padding: 1px 2px;
}

</style>
