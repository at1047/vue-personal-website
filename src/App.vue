<template>
  <header>
  </header>
  <body>
    
    <transition name="slide">
    <SlideMenu v-show="showSlideMenu" v-on:close-slide="closeSlideMenu()"></SlideMenu>
    </transition>
    <nav>
      <div class="nav-bar nav-bar-left">
        <span class="nav-icons" v-on:click="openSlideMenu()"><font-awesome-icon icon="fa-bars" /></span>
      </div>
      <div class="nav-bar nav-bar-center">
        <router-link class="nav-text" to="/">Home</router-link>
        <router-link class="nav-text" to="/projects">Projects</router-link>
        <!--<router-link class="nav-text" to="/editor">Editor</router-link>-->
        <router-link class="nav-text" to="/recipes">Recipes</router-link>
      </div>
      <div class="nav-bar nav-bar-right">
        <a class="nav-icons" href="https://github.com/at1047" target="_blank"><font-awesome-icon icon="fa-brands fa-github" /></a>
        <a class="nav-icons" href="https://www.youtube.com/channel/UCSjOvYqYrVd5-d78yg-Cvlw" target="_blank"><font-awesome-icon icon="fa-brands fa-youtube" /></a>
        <a class="nav-icons" target="_blank"><font-awesome-icon icon="fa-envelope" /></a>
        <ThemeToggle />
      </div>
    </nav>
    <div id="nav-underline"></div>

    <main>
      <RouterView />
    </main>
  </body>
</template>

<script>

import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import SlideMenu from './components/SlideMenu.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default defineComponent({
    name: 'App',
    components: {
    RouterView,
    RouterLink,
    SlideMenu,
    ThemeToggle,
  },
  data() {
    return {
      showSlideMenu: false,
    }
  },
  methods: {
      openSlideMenu(){
        this.$emit('open-slide');
        this.showSlideMenu = true;
      },
      closeSlideMenu(){
      this.showSlideMenu = false;
      }
    },
})

</script>

<style scoped>
nav {
  display: inline-grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  position:relative;
}



a {
  display: grid;
  align-items: center;
}

button {
  background: -webkit-linear-gradient(0deg, var(--color-gradient-pink-start), var(--color-gradient-pink-end));
  padding: 0 5px;
  border-radius: 5px;
  border: 0;
}

#nav-underline {
  display: block;
  width: 100%;
  height: 0.5px;
  background: var(--color-background-light);
}

.nav-icons {
  font-size: 24px;
}

.nav-icons:hover {
  cursor: pointer;
}

.nav-text {
  font-size: 16px;
  font-weight: 200;
}
.nav-icons,
.nav-text {
  transition: color 0.5s ease-in-out;
  color: var(--color-text);
}


.nav-bar {
  box-sizing: border-box;
}


.nav.router-link-exact-active {
  opacity: 0.5;
  color: var(--color-text-gray);
  cursor: default;
}

.nav-bar-left {
  flex-basis: 20%;
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-left: none;
}
.nav-bar-center {
  flex-basis: 55%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 70px;
}
.nav-bar-right {
  flex-basis: 25%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 40px;

}
/*
.nav-bar-contacts,
.nav-bar-socials {
  flex-grow: 1;
}
.nav-bar-socials {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: 50px;
  padding-right: 50px;
}

.nav-bar-contacts {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
*/



</style>
