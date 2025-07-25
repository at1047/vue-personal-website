<template>
    <div class="project-card" >
        <h2 class="text">{{ title }}</h2>
        <div class="underline" />
        <p class="text">{{ description }}</p>
        <div class="icons">
            <!-- <div class="icon" v-for="(icon, idx) of icons">
                <img :src="icon" />
            </div> -->
        </div>
        
    </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProjectCard',
    components: {
    },
    props: [
        'title',
        'description',
        'icons'
    ]
});
</script>

<style scoped>


    h2 {
        margin-bottom: 0;
        font-weight: bolder;
        /* background-color: #c464df; */
        /* background: -webkit-linear-gradient(0deg, #f581e4, #9d2fe7); */
    }

    .underline {
        width: 100%;
        height: 2px;
        /* background-color: #D1D1D1; */
        background: -webkit-linear-gradient(0deg, #689edf, #9f5ccc);

    }

    .project-card {
        /* padding: 5px 10px 10px; */
        background-color: #2F2F2F;
        transition: background-color 100ms ease-out;
        margin-bottom: 20px;
    }

    .project-card:hover {
        box-shadow: inset 0 0 10px #222222;
        /* background-color: #3f3f3F; */
        cursor: pointer;
    }

    p.text {
        margin-top: 15px;
        margin-bottom: 40px;
        font-size: 16px;
        color: #D1D1D1;
    }

    .icons {
        display: flex;
        flex-direction: row;
    }

    .icon {
        margin-right: 5px
    }

    img {
        height: 20px;
        opacity: 0.8;
    }
</style>