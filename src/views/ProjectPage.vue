<template>

    <p class="breadcrumb">~ / projects</p>
    <!--
    <div v-for="(project, idx) of projects" :idx = idx>
        <router-link :to="`/projects/${project.projectCode}`"><h3 class="text menu-item">{{ project.project }}</h3></router-link>
    </div>
    <p style="margin-top: 30px; text-align: center;" v-if="loading" class="text">Loading...</p>
    -->

  <div class="card-grid">
    <div class="card">
      <router-link to="/projects/clarent">
        <div class="menu-item">
          <h3 class="text text-h3">Clarent</h3>
          <p>A really good ergonomic keyboard</p>
          <img class="card-img" src="/clarent_2.png" />
        </div>
      </router-link>
    </div>

    <div class="card">
      <router-link to="/projects/tripod">
        <div class="menu-item">
          <h3 class="text text-h3">Tripod</h3>
          <p>A really good ergonomic keyboard</p>
          <img class="card-img" src="/clarent_2.png" />
        </div>
      </router-link>
    </div>
    
    <!--
    <div class="card menu-item">
      <router-link to="/projects/clarent">
        <div>
          <h3 class="text">Clarent</h3>
          <p>A really good ergonomic keyboard</p>
        </div>
      </router-link>
    </div>
    <div class="card menu-item">
      <router-link to="/projects/clarent">
        <div>
          <h3 class="text">Clarent</h3>
          <p>A really good ergonomic keyboard</p>
        </div>
      </router-link>
    </div>
    <div class="card menu-item">
      <router-link to="/projects/clarent">
        <div>
          <h3 class="text">Clarent</h3>
          <p>A really good ergonomic keyboard</p>
        </div>
      </router-link>
    </div>
-->
  </div>
</template>

<script>

    import { defineComponent } from 'vue';
    // import axios from 'axios';
    import { RouterLink, RouterView } from 'vue-router'

    // console.log(import.meta.env)

    export default defineComponent({
        name: 'Projects',
        components: {
        //    RouterView,
            RouterLink,
        },
        // data() {
        //     return {
        //         projects: null,
        //         loading: true
        //     };
        // },
        // async created() {
        //     try {
        //         this.projects = await axios.get("//" + import.meta.env.VITE_API
        //             + "/projects")
        //             .then((res) => res.data)
        //     } catch(e) {
        //         console.error(e);
        //     };
        //     this.loading = false
        // },
    });
</script>


<style scope>
/*
.menu-item:hover {
  opacity: 0.3 ;
}
*/

.menu-item {
background-color: var(--color-menu-item);
border-radius: 5px;
margin-top: 7px;
padding: 5px 10px 10px;
transition: background-color 100ms ease-out;
}

.menu-item:hover {
background-color: var(--color-menu-item-hover);
}



.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem;
}

.card {
  border-radius: 4px;
  padding: .5rem;
}

.card-img {
  padding-top: 20px;
  max-width: 100%;
  height: auto;
}

.breadcrumb {
    font-size: 16px;
}

h2 {
  font-size: 60px;
  margin-bottom: 3px;
}

.text-h3 {
  font-size: 30px;
  color: #D1D1D1;
}

h4 {
  font-size: 16px;
}

p {
  font-size: 14px;
  /*
  margin-bottom: 30px;
  */
  color: #C1C1C1;
}

</style>
