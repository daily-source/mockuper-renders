<template>
  <div class="event-page">
    <shared-header
      :logo='logo'
    />
    <div class="event__content">
      <div class="container event__container py-4" :id="event.id">
        <p class='note-text'><span class="has-text-weight-bold">Note:</span> This website is still being built, and is partly done. When new pages are being built by web developers, they often host them at developer domains and links similar to the one you see in your address bar.</p>
      </div>
    </div>
    <shared-footer />
  </div>
</template>

<script>
import SharedHeader from 'Components/Shared/SharedHeader'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'EventPage',

  components: {
    SharedHeader,
    SharedFooter,
  },

  data () {
    return {
      event: null,
    }
  },


  methods: {
    getEvent () {
      const {category, id} = this.$route.params
      this.event = this.$store.getters['fundraisers/getFundraiser'](category, id)
    }
  },

  computed: {
    logo () {
      console.log(this.$route.params);
      if (this.$route.name === 'event') {
        const {category, id} = this.$route.params

        const event = this.$store.getters['fundraisers/getFundraiser'](category, id)
        return require(`@/assets/img/logos/${category}/${event.imgName}`)
      } else {
        return require('@/assets/img/logo.png')
      }
    }
  },

  watch: {
    event: {
      handler: 'getEvent',
      immediate: true,
    }
  }
}
</script>

<style lang='scss'>
  .event__container {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .note-text {
    font-size: 1.25rem;
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
    text-align:center;
    margin-top: 2.75rem;
  }

  .event__content {
    min-height: 400px;
  }
</style>