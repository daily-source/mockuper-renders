<template>
  <div class='home-page-actions'>
    <button 
      class='button is-info home-page-actions__button'
      @click="showVideo"
    >
      Play
    </button>
    <button 
      class='button is-info home-page-actions__button'
      @click='openInfo'
    >
      Info
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Icon from 'Components/general/Icons'

export default {
  name: 'HomePageActions',

  components: {
    Icon,
  },

  methods: {
    ...mapActions({
      showVideo: 'video/showVideo',
      openInfo: 'info/openInfo',
    }),
  }
}
</script>

<style lang="scss" scoped>
.home-page-actions {
  display: flex;
  flex-direction: column;

  &__button {
    margin-bottom: 1em;
  }
}

.more-info-modal >>> .modal-background {
  background-color: rgba(0,0,0,.7) !important;
}
</style>
