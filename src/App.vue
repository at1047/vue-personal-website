<template>
  <header>
  </header>
  <body>

    <transition name="slide">
      <SlideMenu v-show="showSlideMenu" v-on:close-slide="closeSlideMenu()"></SlideMenu>
    </transition>
    <nav>
      <div class="nav-bar nav-bar-left">
        <!-- <span class="nav-icons" v-on:click="openSlideMenu()"><font-awesome-icon icon="fa-bars" /></span> -->
        <Breadcrumbs :breadcrumbArr="breadcrumbArr" />
      </div>
      <div class="nav-bar nav-bar-center">
        <router-link class="nav-text" to="/">Home</router-link>
        <router-link class="nav-text" to="/projects">Projects</router-link>
        <!--<router-link class="nav-text" to="/editor">Editor</router-link>-->
        <router-link class="nav-text" to="/blog">Blog</router-link>
        <!--<router-link class="nav-text" to="/recipes">Recipes</router-link>-->

      </div>
      <div class="nav-bar nav-bar-right">
        <a class="nav-icons" href="https://github.com/at1047" target="_blank"><font-awesome-icon icon="fa-brands fa-github" /></a>
        <!--<a class="nav-icons" href="https://www.youtube.com/channel/UCSjOvYqYrVd5-d78yg-Cvlw" target="_blank"><font-awesome-icon icon="fa-brands fa-youtube" /></a>-->
        <!--<a class="nav-icons" :href="mailtoHref"><font-awesome-icon icon="fa-envelope" /></a>-->
        <ThemeToggle />
      </div>
    </nav>
    <div id="nav-underline"></div>

    <main class="main-content">
      <div class="main-content-inner">
        <RouterView />
      </div>
    </main>
  </body>
</template>

<script>

import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import SlideMenu from './components/SlideMenu.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    RouterLink,
    SlideMenu,
    ThemeToggle,
    Breadcrumbs,
  },
  data() {
    return {
      showSlideMenu: false,
      contactEmail: import.meta.env.VITE_CONTACT_EMAIL || ''
    }
  },
  computed: {
    mailtoHref() {
      return this.contactEmail ? `mailto:${this.contactEmail}` : 'mailto:';
    },
    breadcrumbArr() {
      const route = this.$route;
      // 1. Initialize with Home and any meta breadcrumbs
      // const base = { home: '/', ...(route.meta || {}) };
      const base = { home: '/'};
      let lastKey = '';

      // 2. NEW: Handle Projects and all nested subpages (Dynamic Loop)
      // This covers "Projects", "ProjectDetails", "ProjectSettings", etc.
      if (
        route.name === 'Projects' || 
          (typeof route.name === 'string' && route.name.startsWith('Project'))
      ) {
        // Split path into parts: ['', 'projects', 'my-app', 'details']
        const segments = route.path.split('/').filter(Boolean);

        if (segments.length >= 3) 
        {
          // A. Create the parent path (Up one level)
          //    Take all segments except the last one and join them.
          const parentPath = '/' + segments.slice(0, -1).join('/');

          // B. Add the "..." breadcrumb
          //    This key displays as "..." and links to the parent folder.
          base['...'] = parentPath;

          // C. Add the last file name (Current Page)
          const lastSegment = segments[segments.length - 1];
          base[lastSegment] = route.path;


        } else {
          Object.assign(base, route.meta || {});
          let currentPath = '';
          console.log(segments)
          segments.forEach(segment => {
            currentPath += `/${segment}`;
            console.log(`seg: ${segment}, currpath: ${currentPath}`)

            // Only add if not already in base (prevents overwriting 'home' or meta)
            if (!Object.prototype.hasOwnProperty.call(base, segment)) {
              // key = display text (e.g. 'my-app'), value = link (e.g. '/projects/my-app')
              base[segment] = currentPath; 
            }
          });

        }
        // Note: We don't set 'lastKey' here because the loop added everything to 'base' directly.
      } 

      // 3. Existing logic for other routes (Blog, Recipes)
      else if (route.name === 'Blog') {
          Object.assign(base, route.meta || {});
        lastKey = 'blog';
      } else if (typeof route.name === 'string' && route.name.startsWith('Blog')) {
          Object.assign(base, route.meta || {});
        const segments = route.path.split('/').filter(Boolean);
        lastKey = segments[segments.length - 1] || '';
      } else if (route.name === 'Recipes') {
          Object.assign(base, route.meta || {});
        lastKey = 'recipes';
      } 
      // No need to check Home explicitly if base already has it, 
      // but keeping your logic safe:
      else if (route.name === 'Home') {
          Object.assign(base, route.meta || {});
        // 'home' is already in base, so this effectively does nothing, which is fine
        lastKey = 'home';
      }

      // 4. Add the single lastKey (for Blog/Recipes logic)
      if (lastKey && !Object.prototype.hasOwnProperty.call(base, lastKey)) {
        base[lastKey] = route.path;
      }

      return base;
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

/*
.main-content {
display: flex;
justify-content: center;
}

.main-content-inner {
width: 800px;
}
*/

nav {
  display: inline-grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  height: 1.5px;
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
  font-weight: 400;
}
.nav-icons,
.nav-text {
  transition: color 0.5s ease-in-out;
  color: var(--color-text);
}

nav {
  background-color: var(--color-nav);
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
  width: 400px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-left: none;
}
.nav-bar-center {
  width: 600px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 70px;
}
.nav-bar-right {
  width: 400px;
  display: flex;
  justify-content: right;
  gap: 50px;
  align-items: center;
  padding: 10px 60px;

}

@media (max-width: 800px) {

  .nav-bar-left {
    display: none;
  }
  .nav-bar-center {
    flex-basis: 100%;
    padding: 10px 40px;
  }
  .nav-bar-right {
    display: none;
  }
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
