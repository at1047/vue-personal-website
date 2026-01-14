<template>
        <pre id="canvas" ref="canvas" style='height:450px;width:390px;'></pre>
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
        margin: 50px auto 0;
        color: var(--color-text);
        font-size: 14px;
    }

</style>
