<template>
  <div class='home-page-actions'>
    <button 
      class='button is-secondary'
      @click="showVideo"
    >
        Play
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
      showVideo: 'video/showVideo'
    }),
  }
}
</script>

<style lang="scss" scoped>
.home-page-actions {
  display: flex;
  flex-direction: column;
}
</style>
