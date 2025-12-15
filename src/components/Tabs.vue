<template>
    <ul v-if="this.tabs != []" class='tabs__header'>
      <li v-for='(tab, index) in tabs'
        :key='tab.title'
        @click='selectTab(index)'>
        {{ tab.title }}
      </li>
    </ul>
    <slot ref="tabs"></slot>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: []         // all of the tabs
    }
  },
  created () {
    this.tabs = this.$children
    console.log(this.$refs.tabs)
    console.log(this.$slots.textContent)
    console.log(this.tabs)
  },
  mounted () {
    console.log(this.tabs)
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i
      console.log(this.tabs)
      console.log(this.$children)
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
      console.log(this.tabs)
    }
  }
}
</script>
