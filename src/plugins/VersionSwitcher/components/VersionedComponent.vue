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

  inheritAttrs: false,

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
    console.log(this.$attrs)
  },

  methods: {
    setComponent () {
      this.component = () => this.loadComponent()
    },

    async loadComponent () {
      const componentName = parseInt(this.$version) === 1 ? this.baseName : `${this.baseName}.${this.$version}`

      try {        
        return await import(`Components/BridgesToGod/${componentName}`)
      } catch {
        return await this.findBaseComponent()
      }
    },

    async findBaseComponent () {
      try {
        const comp = await import(`Components/BridgesToGod/${this.baseName}`)

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
