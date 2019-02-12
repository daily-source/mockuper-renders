<template>
  <div class='home-page-actions'>
    <button 
      class='button is-info home-page-actions__button'
      @click="showVideo"
      v-tooltip.bottom-start='"View the Intro Video"'
    >
      <icon-play 
        :width='36'
        :height='36'
      />
    </button>
    <button 
      class='button is-info home-page-actions__button'
      @click='openInfo'
      v-tooltip.bottom-start='"Click to show info."'
    >
      <icon-info 
        :width='36'
        :height='36'
      />
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import IconPlay from 'LocalComponents/Icons/IconPlay'
import IconInfo from 'LocalComponents/Icons/IconInfo'

export default {
  name: 'HomePageActions',

  components: {
    IconPlay,
    IconInfo,
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
  padding: 1.375em .5em;
  background-color: rgba($primary, .9);
  border-radius: 100px;

  &__button {
    padding: 0;
    height: auto;
    background-color: transparent !important;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
}
</style>
