<template>
    <body>
        <Cube></Cube>
        <!-- <p style="text-align: center" class="text">Nothing much to see, still populating the content. Head over to the Recipes page or the Renju page!</p> -->
    </body>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Cube from '../components/Cube.vue'

export default defineComponent({
    name: 'HomePage',
    components: {
        Cube,
    },
});
</script>
