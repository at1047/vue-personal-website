<template>
  <p style="margin-top: 30px; text-align: center;" v-if="loading" class="text">Loading...</p>
  <div v-for="(recipe, idx) of recipes" :idx = idx>
    <div class="recipe-header" @click="() => toggleOpen(idx)" >
      <img v-if="recipe.icon" class="icons" :src="recipe.icon + '.svg'" />
      <div v-if="!recipe.icon" style="height: 10px; width: 23px"></div>
      <h3 style="display: inline-block"  class="text" > {{ recipe['name'] }} </h3>
    </div>
    <ul class="recipe" v-if="recipe.open">
      <li class="text" v-for="ingredient of recipe['ingredients']" >
        {{ ingredient.quantity !== 0 ? `${ingredient.quantity}` :  ''}}
        {{ ingredient.unit !== '' ? `${ingredient.unit} of ` : ''}}
        {{ ingredient.name }}
      </li>
      <p class="text" style="fontSize: 12px">{{ recipe.notes }}</p>
    </ul>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface Recipe {
  name: string,
  ingredients: Ingredient[],
  notes: string,
  icon: string,
  open: boolean
}

interface Ingredient {
  name: string,
  quantity: number,
  unit: string
}

export default defineComponent({
  name: "RecipeList",
  components: {

  },
  data() {
    return {
      recipes: <Recipe[]>[],
      loading: true
    };
  },
  methods: {
    toggleOpen: function (i: number) {
      this.recipes = this.recipes.map((recipe, idx) => {
        if (idx === i) {
          recipe.open = !recipe.open;
        }
        return recipe;
      });
    }
  },
  async created() {
    try {
      this.recipes = await axios.get("https://andrew-tai.com/api/recipes")
        .then((res) => res.data)
        .then((data) => data.map((obj: Ingredient) => ({...obj, open: false})))

      // this.recipes = [{
      //     name: 'Pizza',
      //     ingredients: [{
      //         name: 'flour',
      //         quantity: 0,
      //         unit: ''
      //     }],
      //     notes: '',
      //     icon: 'pizza',
      //     open: false
      // },{
      //     name: 'Pancakes',
      //     ingredients: [{
      //         name: 'pickle juice',
      //         quantity: 2,
      //         unit: 'splashes'
      //     }],
      //     notes: 'I’ve used this recipe for fried Oreos more times than actual pancakes. The problem with egged pancake recipes is that they make far too big of a portion, and you can’t reasonably split an egg into a half when halving a recipe. Hence, I looked for an eggless pancake recipe and this is the one I discovered.',
      //     icon: 'pancake',
      //     open: false
      // },{
      //     name: 'Pork belly',
      //     ingredients: [],
      //     notes: '',
      //     icon: 'meat',
      //     open: false
      // },{
      //     name: 'Carbonara',
      //     ingredients: [],
      //     notes: '',
      //     icon: 'pasta',
      //     open: false
      // }]
    } catch(e) {
      console.error(e);
    };
    this.loading = false
  },
})
</script>

<style scoped>
.recipe {
  overflow: hidden;
}

.recipe-header {
  background-color: var(--color-card-background);
  border-radius: 8px;
  margin-top: 10px;
  padding: 2px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background-color 100ms ease-out;
}

.recipe-header:hover {
  background-color: var(--color-card-background-hover);
}

.icons {
  vertical-align: middle;
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

p.text {
  /* color: #c9c9c9; */
  margin-bottom: 30px;
  font-size: 16px;
}


</style>
