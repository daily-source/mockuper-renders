<template>
  <alert 
    class='general-info'
    :open='isOpened'
    @closeButtonClicked='onCloseButtonClicked'
  >
    Click the bulbs to see who's helping free slaves and where they're helping. Click <router-link to='/login'>here</router-link> to be part of the Virtual Railroad.
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
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-size: .875em;
  padding: 1em;
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

