<template>
  <transition
    name='splash-fade-short'
  >
    <div 
      class="splash"
      v-if='isShown'
    >
      <button 
        class='splash__button button is-text'
        @click='onEnterClick'
      >
        <img 
          :src="require('@/assets/img/logo-1.png')"
          class='splash__logo'
          alt="Virtual Railroad Logo"
        >
        Click here to enter the Virtual Railroad
      </button>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SplashLoader',

  data () {
    return {

    }
  },

  methods: {
    onEnterClick () {
      this.hideSplash()
      setTimeout( () => {
        this.playVideo()
      }, 300)
    },

    ...mapActions({
      hideSplash: 'splash/hideSplash',
			playVideo: 'video/playVideo',
    }),
  },

  computed: {
    ...mapState({
      isShown: state => state.splash.isShown
    }),
  },
}
</script>

<style lang='scss'>
.splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__logo {
    margin-bottom: 1em;
    display: inline-block;
  }

  &__button {
    background-color: transparent !important;
    color: $secondary !important;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    height: auto;
  }
}

.splash-fade-short-enter-active, .splash-fade-short-leave-active {
	transition: opacity .2s ease;
}

.splash-fade-long-enter-active, .splash-fade-long-leave-active {
	transition: opacity 1.7s ease;
}

.splash-fade-short-enter, 
.splash-fade-short-leave-to,
.splash-fade-long-enter, 
.splash-fade-long-leave-to {
	opacity: 0;
}
</style>
