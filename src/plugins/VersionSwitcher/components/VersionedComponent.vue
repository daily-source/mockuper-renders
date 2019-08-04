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
      const componentName = `v${this.$version}/${this.baseName}`

      try {        
        return await import(`Components/CountersForThePoor/${componentName}`)
      } catch {
        return await this.findBaseComponent()
      }
    },

    async findBaseComponent () {
      try {
        const comp = await import(`Components/CountersForThePoor/v2/${this.baseName}`)

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
