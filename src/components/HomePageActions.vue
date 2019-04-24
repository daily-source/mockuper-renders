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
    <button
      class='button is-info home-page-actions__button'
      @click='onSwitchThemeClicked'
    >
      <icon-night-mode 
        :width='33.42'
        :height='33.42'
        v-if='mapStyle === "light"'
      />
      <icon-light-mode 
        :width='33.42'
        :height='33.42'
        v-if='mapStyle === "dark"'
      />
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import IconPlay from 'LocalComponents/Icons/IconPlay'
import IconInfo from 'LocalComponents/Icons/IconInfo'
import IconNightMode from 'LocalComponents/Icons/IconNightMode'
import IconLightMode from 'LocalComponents/Icons/IconLightMode'

export default {
  name: 'HomePageActions',

  components: {
    IconPlay,
    IconInfo,
    IconNightMode,
    IconLightMode,
  },

  methods: {
    onSwitchThemeClicked () {
      const style = this.mapStyle === 'light' ? 'dark' : 'light'
      
      this.changeMapStyle(style)
    },

    ...mapActions({
      showVideo: 'video/showVideo',
      openInfo: 'info/openInfo',
      changeMapStyle: 'map/changeMapStyle',
    }),
  },

  computed: {
    ...mapState({
      mapStyle: state => state.map.mapStyle
    })
  }
}
</script>

<style lang="scss" scoped>
.home-page-actions {
  display: flex;
  flex-direction: column;
  padding: 1.375em .5em;
  background-color: rgba($primary, .7);
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
