<template>
  <p class="breadcrumb">~ / projects</p>
  
  <div class="projects-container">
    <!-- Section Headers -->
    <div class="section-headers">
      <h2 class="section-title hardware-title">Hardware</h2>
      <h2 class="section-title software-title">Software</h2>
    </div>
    
    <!-- Background Divider -->
    <div class="background-divider"></div>
    
    <!-- All Projects Container -->
    <div class="all-projects">
      <div class="card" style="--bias-left: 0%; --bias-right: 20%;">
        <router-link to="/projects/clarent">
          <div class="menu-item">
            <h3 class="text text-h3">Clarent</h3>
            <p>A Split, Tented, Columnar, Bistable, Ergonomic Keyboard for Typing & Gaming</p>
          </div>
        </router-link>
      </div>
      
      <div class="card" style="--bias-left: 0%; --bias-right: 50%;">
        <router-link to="/projects/tripod">
          <div class="menu-item">
            <h3 class="text text-h3">Tripod</h3>
            <p>An indestructible tripod for recording volleyball</p>
          </div>
        </router-link>
      </div>
      
      <div class="card" style="--bias-left: 60%; --bias-right: 0%;">
        <router-link to="/projects/carwennan">
          <div class="menu-item">
            <h3 class="text text-h3">Carwennan</h3>
            <p>Software development project</p>
          </div>
        </router-link>
      </div>
      
      <!-- <div class="card" style="--bias-left: 50%; --bias-right: 0%;">
        <router-link to="/projects/recipes-api">
          <div class="menu-item">
            <h3 class="text text-h3">Recipes API</h3>
            <p>Backend API in Go</p>
          </div>
        </router-link>
      </div>
      
      <div class="card" style="--bias-left: 70%; --bias-right: 0%;">
        <router-link to="/projects/renju">
          <div class="menu-item">
            <h3 class="text text-h3">Renju Game</h3>
            <p>Multiplayer game</p>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 0%; --bias-right: 20%;">
        <router-link to="/projects/iot-project">
          <div class="menu-item">
            <h3 class="text text-h3">IoT Project</h3>
            <p>Hardware + Software integration</p>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 15%; --bias-right: 15%;">
        <router-link to="/projects/embedded-system">
          <div class="menu-item">
            <h3 class="text text-h3">Embedded System</h3>
            <p>Firmware + Hardware design</p>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 10%; --bias-right: 10%;">
        <router-link to="/projects/robotics">
          <div class="menu-item">
            <h3 class="text text-h3">Robotics Platform</h3>
            <p>Mechanical + Software + Electronics</p>
          </div>
        </router-link>
      </div> -->

    </div>
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
margin-top: 0;
padding: 15px 10px;
transition: background-color 100ms ease-out;
display: flex;
align-items: center;
justify-content: space-between;
min-height: 40px;
}

.menu-item:hover {
background-color: var(--color-menu-item-hover);
}

.projects-container {
  position: relative;
  margin-bottom: 60px;
}

.section-headers {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 3;
  gap: 50%;
}

.background-divider {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, 
    var(--color-gradient-start), 
    var(--color-gradient-purple-start)
  );
  z-index: 1;
}

.all-projects {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 32px;
  margin: 0;
  text-align: center;
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.hardware-title {
  color: var(--color-gradient-start);
}

.software-title {
  color: var(--color-gradient-purple-start);
}

.cross-title {
  color: var(--color-gradient-pink-start);
}

/* Flexible Bias System using CSS Custom Properties */
.card {
  margin-left: var(--bias-left, 0%);
  margin-right: var(--bias-right, 0%);
  position: relative;
}

/* Border indicators based on bias direction */
.card[style*="--bias-left: 0%"] {
  border-left: 3px solid var(--color-gradient-start);
}

.card[style*="--bias-right: 0%"] {
  border-right: 3px solid var(--color-gradient-purple-start);
}

/* Cross-discipline projects get both borders */
.cross-card-spanning {
  border-left: 3px solid var(--color-gradient-start);
  border-right: 3px solid var(--color-gradient-purple-start);
}

.card {
  border-radius: 4px;
  padding: .5rem;
}

/* Removed card-img styling since images are no longer used */

.breadcrumb {
    font-size: 16px;
}

h2 {
  font-size: 60px;
  margin-bottom: 3px;
}

.text-h3 {
  font-size: 20px;
  color: var(--color-text-tertiary);
  margin: 0;
  font-weight: 600;
}

h4 {
  font-size: 16px;
}

.menu-item p {
  font-size: 14px;
  color: var(--color-text-light-gray);
  margin: 0;
  text-align: right;
  flex: 1;
  margin-left: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-headers {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .background-divider {
    display: none;
  }
  
  .card {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* Show borders based on original bias direction */
  .card[style*="--bias-left: 0%"] {
    border-left: 3px solid var(--color-gradient-start);
    border-right: none;
  }
  
  .card[style*="--bias-right: 0%"] {
    border-right: 3px solid var(--color-gradient-purple-start);
    border-left: none;
  }
  
  .cross-card-spanning {
    border-left: 3px solid var(--color-gradient-start);
    border-right: 3px solid var(--color-gradient-purple-start);
  }
}

@media (max-width: 500px) {
  .projects-container {
    gap: 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .project-cards {
    gap: 15px;
  }
}

</style>
