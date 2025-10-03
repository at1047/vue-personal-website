<template>
    <ul>
        <li v-for="(value, key, idx) of this.breadcrumbArr" v-if="this.breadcrumbArr" :idx = idx>
            <span v-if="idx != Object.keys(this.breadcrumbArr).length - 1">
              <router-link :to="`${value}`">
                <span>{{ (key == 'home') ? '' : ' / '}}</span>
                <span class="address">{{ (key == 'home') ? '~' : key }}</span>
              </router-link>
            </span>
            <span class="destination" v-if="idx == Object.keys(this.breadcrumbArr).length - 1">
                  {{ (key == 'home') ? '~' : ' / ' + key }}
            </span>
        </li>
    </ul>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
    name: 'Breadcrumbs',
    props: ['breadcrumbArr'],
    components: {
        RouterView,
        RouterLink,
    },
    created() {
      // console.log('test')
      console.log(Object.keys(this.breadcrumbArr).length - 1)
      console.log(this.breadcrumbArr)
    }


});
</script>

<style scoped>

ul {
  margin: 0;
  padding: 0;
}

li {
    display:inline;
}

.destination {
  color: var(--color-text-muted2);
}

</style>
