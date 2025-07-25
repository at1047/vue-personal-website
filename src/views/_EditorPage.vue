<template>
  <p>helo</p>
  <EditorList path="blogs" />
  <!--<EditorMarkdown />-->
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import EditorProjectPage from '../views/EditorProjectPage.vue'
import EditorList from '../components/EditorList.vue'
// import Vim from './Vim.vue';

export default defineComponent({
    name: 'EditorPage',
    components: {
      EditorProjectPage,
      EditorList,
        // Vim,
    },
});
</script>
