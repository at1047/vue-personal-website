<template>
    <div class="main">
      <h2>Editor: {{path}}</h2>
        <div v-for="(title, idx) of titles" :idx = idx>
            <!--
            <router-link :to="`/editor/${this.$route.params.projectName}/${blogtitle.titleCode}`">
                <h3>{{ blogtitle.title }}</h3>
            </router-link>
            -->
                <h3>{{ title.Title }}</h3>

        </div>
    </div>
    <p style="margin-top: 30px; text-align: center;" v-if="loading" class="text">Loading...</p>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
    name: 'EditorList',
    props: [
      'path'
    ],
    components: {
        RouterView,
        RouterLink,
    },

    data() {
        return {
            loading: true,
            titles: [],
        }
    },
    async created() {
        try {
            this.titles = await axios.get("//" + import.meta.env.VITE_API
              + "/" + this.path)
                .then((res) => res.data)
        } catch(e) {
            console.error(e);
        };
        console.log(this.titles)
        this.loading = false
    },
});
</script>
