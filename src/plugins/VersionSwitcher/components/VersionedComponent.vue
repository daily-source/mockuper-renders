<template>
  <component 
    :is='component'
    v-if='component'
  />
</template>

<script>
export default {
  name: 'VersionedComponent',

  props: {
    baseName: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      component: null,
    }
  },

  mounted () {
    this.loadComponent()
  },

  methods: {
    loadComponent () {
      const componentName = parseInt(this.$version) === 1 ? this.baseName : `${this.baseName}.${this.$version}`
      this.component = () => import(`Components/GrowOneForGood/${componentName}`)
        .then(comp => {
          return comp
        })
        .catch(err => {
          return null
        })
    }
  },
}
</script>
