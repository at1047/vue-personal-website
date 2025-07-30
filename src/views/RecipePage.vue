<template>
    <h1 class="text">Recipes</h1>
    <p class="text">
        A list of recipes that I always go back to. Stored in a <span class="emph">MongoDB</span> database and queried through <span class="emph">Axios</span> so I don't have to keep looking up the same recipe on the same website everytime I go back to them. Each recipe is my favourite iteration of that food, with tips on preparation that I've accumulated over time.
    </p>
    <RecipeList />
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import RecipeList from '../components/RecipeList.vue'

export default defineComponent({
    name: 'HomePage',
    components: {
        RecipeList,
    },
    data() {
        return {
        };
    },
    methods: {

    }

});
</script>

<style>


.emph {
    color: #9a7ad5;
}

</style>
