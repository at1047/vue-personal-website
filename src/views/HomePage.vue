<template>
    <body>
        <Cube id="canvas"></Cube>
    <!--<p style="text-align: center" class="text">test</p>-->
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

<style scoped>

@media (max-width: 500px) {
    
    #canvas {
        display: none;
    }
}

</style>
