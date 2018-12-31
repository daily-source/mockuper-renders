<template>
  <div class="layout-base">
    <section class="section">

    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomPage',

  computed: {
    id () {
      return this.$route.params.id
    },

    title () { 
      if (this.widget.title) {
        return this.widget.title
      } else if (this.counter) {
        return this.counter.title
      }

      return ''
    },

    ...mapState({
      widget (state) {
        return state.counterwidgets.widgets.find(widget => widget.id === parseInt(this.id))
      },

      counter (state) {
        return this.widget && state.counterwidgets.counters.find(counter => counter.id === this.widget.counterId)
      }
    })
  },

  metaInfo() {
    if (!this.widget) return {}

    const description = this.widget.message
    const title = `${this.title} | Counters for the Poor`

    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', property: 'og:description', content: description },
      ]
    }
  } 
}
</script>

<style lang='scss'>

</style>
