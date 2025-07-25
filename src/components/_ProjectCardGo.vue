<template>
    <h2 class="text">Recipes Backend API</h2>

    <p class="text small-text">I wanted to try out a new programming language, GO, and I read that GO is widely used for backend applications and building APIs. Previously I've build a variety of APIs using both Python (specifically serving different content through Flask), and JavaScript. In addition, I've also mainly used relational databases like PostgreSQL, so I wanted to explore NOSQL in this project. I chose MongoDB because I've interacted with a MongoDB database once during a previous internship, and wanted to explore it further.</p>

    <p class="text small-text">Creating the MongoDB database could not be easier. MongoDB Atlas offers a free tier that has built in functionalities for network access, and a simple UI for the basic CRUD functions. There was also a tutorial for connecting to the MongoDB database with GO through MongoDB's own library.</p>

    <p class="text small-text">To implement routing, I used GO's Gin library. This allows me to call different functions depending on the url of the request and the type of request. I implemented the basic "Read", "Read all", "Create one" functionalities and soon enough I had a working backend API that I could deploy to my virtual machine. I tested the functionality of this API with Postman, a tool I've used extensively at my previous internships, and learnt how to write an OpenAPI document describing my API.</p>

    <a href="https://github.com/at1047/go-recipe" target="_blank">Github</a>

    <a href="https://andrew-tai.com/renju" target="_blank">Demo</a>

</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProjectCardRenju',
    components: {
    },
});
</script>


<style scoped>
h2 {
    background: -webkit-linear-gradient(30deg, #b95fe7, #6096ee);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

p {
    font-size: 14px;
    margin-bottom: 20px;
}

</style>