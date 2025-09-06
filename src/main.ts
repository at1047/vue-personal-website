import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faHouse, faUser, faBlog, faEnvelope, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'

library.add(faHouse, faBars, faUser, faBlog, faGithub, faYoutube, faEnvelope, faSun, faMoon);
// import { OhVueIcon, addIcons } from "oh-vue-icons";
// import { BiGithub } from "oh-vue-icons/icons";

// addIcons(BiGithub);

createApp(App)
    .use(router)
    // .component("v-icon", OhVueIcon)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
