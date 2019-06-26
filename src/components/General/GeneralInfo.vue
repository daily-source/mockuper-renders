<template>
  <alert 
    class='general-info'
    :open='isOpened'
    @closeButtonClicked='onCloseButtonClicked'
  >
    Click the light bulbs to see who's fighting slavery and where they're helping. 
  </alert>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Alert from 'LocalComponents/Alert/Alert'
export default {
  name: 'GeneralInfo',
  props: {
    /**
     * Specifies if the info is opened.
     */
    opened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  created () {
    if (this.opened) {
      this.openInfo()
    } else {
      this.closeInfo()
    }
  },
  components: {
    Alert,
  },
  methods: {
    /**
     * Handles closing of the alert.
     */
    onCloseButtonClicked () {
      this.closeInfo()
    },
    ...mapActions({
      closeInfo: 'info/closeInfo',
      openInfo: 'info/openInfo',
    }),
  },
  computed: {
    ...mapState({
      isOpened (state) {
        return state.info.opened
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.general-info {
  margin-left: auto;
  margin-right: auto;
  padding: .625rem .75em;
  text-align: center;
  margin-top: 70px;
  max-width: 95%;
  font-size: 0.875em;
  border-radius: 100px;

  @include tablet {
    margin-top: 140px;
    max-width: 760px;
    font-size: 1.125em;
  }
}
</style>

<style lang="scss">
.general-info {
  .delete {
    right: 2%;
    top: 25%;
  }
}
</style>