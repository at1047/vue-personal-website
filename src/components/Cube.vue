<template>
        <pre id="canvas" ref="canvas" style='height:700px;width:700px;margin-top: 50px;'></pre>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

// @ts-ignore
import { main } from '/public/cube.js';

export default defineComponent({
    name: 'Cube',
    components: {},
    mounted
});

function mounted() {
    // console.log('mounted')
    // console.log(this.$refs.canvas.clientHeight)
    // console.log('mounted2')
    main()
}

</script>

<style scoped>
    /* wrapper {
        display: flex;
        justify-content: center;
    } */
    pre {
        margin: auto;
        color: var(--color-text);
        font-size: 14px;
    }

</style>
