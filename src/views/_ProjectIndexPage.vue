<template>
    <Breadcrumbs :breadcrumbArr="this.breadcrumbArr" v-if="this.loading == false"/>
    <div class="main">
        <h2>Blogs</h2>
        <div v-for="(blogtitle, idx) of blogtitles" :idx = idx>
            <router-link :to="`/projects/${this.$route.params.projectName}/${blogtitle.titleCode}`">
                <h3>{{ blogtitle.title }}</h3>
            </router-link>
        </div>
    </div>
    <p style="margin-top: 30px; text-align: center;" v-if="loading" class="text">Loading...</p>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumbs from '../components/Breadcrumbs.vue'

export default defineComponent({
    name: 'ProjectIndex',
    components: {
        RouterView,
        RouterLink,
        Breadcrumbs,
    },
    data() {
        return {
            blogtitles: null,
          breadcrumbArr: null,
            loading: true,
        }
    },
    async created() {
        try {
            this.blogtitles = await axios.get("//" + import.meta.env.VITE_API
              + "/blogtitles/" + this.$route.params.projectName)
                .then((res) => res.data)
        } catch(e) {
            console.error(e);
        };
        this.breadcrumbArr = { ...this.$route.meta }
        this.breadcrumbArr[this.$route.params.projectName] = '/projects/' + this.$route.params.projectName
        this.loading = false
    },
});
</script>

