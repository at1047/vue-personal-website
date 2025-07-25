<template>
    <div class="main">
        <h2>Blog Editor</h2>
        <div v-for="(blogtitle, idx) of blogtitles" :idx = idx>
            <!--
            <router-link :to="`/editor/${this.$route.params.projectName}/${blogtitle.titleCode}`">
                <h3>{{ blogtitle.title }}</h3>
            </router-link>
            -->
                <h3>{{ blogtitle.Title }}</h3>

        </div>
    </div>
    <p style="margin-top: 30px; text-align: center;" v-if="loading" class="text">Loading...</p>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
    name: 'EditorProjectPage',
    components: {
        RouterView,
        RouterLink,
    },
    data() {
        return {
            loading: true,
            blogtitles: [],
        }
    },
    async created() {
        try {
            this.blogtitles = await axios.get("//" + import.meta.env.VITE_API
              + "/blogs")
                .then((res) => res.data)
        } catch(e) {
            console.error(e);
        };
        console.log(this.blogtitles)
        this.loading = false
    },
});
</script>
