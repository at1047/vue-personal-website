<template>

        <div id="mySidenav" class="sidenav">
            <p @click="close()" class="closebtn" >&times;</p>
            <router-link @click="close()" class="nav-text" to="/recipes">Recipes</router-link>
            <a @click="close()" class="nav-text" href="https://www.andrew-tai.com/renju/">Renju</a>
        </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'


export default defineComponent({
    name: 'SlideMenu',
    components: {},
    methods: {
      close(){
        this.$emit('close-slide');
      }
    },
});
</script>

<style scoped>

.sidenav {
  height: 100vh;
  width: 300px;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: var(--color-menu-dark);
  overflow-x: hidden;
  transition: transform 1s;
  padding-top: 60px;
}

.nav-text {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 20px;
  color: var(--color-text);
  display: block;
  transition: color 0.3s;
}

.nav-text:hover,
.closebtn:hover {
  color: var(--color-text-muted);
  cursor: pointer;
}

.closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  color: var(--color-text-bright);
  transition: color 0.3s;
}
.slide-enter-active {
  animation: menu-slide .5s;
}
.slide-leave-active {
  animation: menu-slide .5s reverse;
  animation-fill-mode: forwards;
}

@keyframes menu-slide {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
