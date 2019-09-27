<template>
  <component 
    :is='component'
    v-if='component'
    v-bind='$attrs'
  />
</template>

<script>
import { setImmediate } from 'timers';
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

  methods: {
    setComponent () {
      this.component = () => this.loadComponent()
    },

    async loadComponent () {
      const componentName = parseInt(this.$version) === 1 ? this.baseName : `${this.baseName}.${this.$version}`

      try {        
        return await import(`Components/GrowOneForGood/${componentName}`)
      } catch {
        return await this.findBaseComponent()
      }
    },

    async findBaseComponent () {
      try {
        const comp = await import(`Components/GrowOneForGood/${this.baseName}`)

        return comp
      } catch {
        console.error("Versioned Component", "Can't find fallback component.")
      }
    },
  },

  watch: {
    $version: {
      immediate: true,
      handler: 'setComponent',
    },
  },
}
</script>
