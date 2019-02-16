<template>
  <div 
    :class='["base-app-container", {"base-app-container--nav-opened": navbarOpened}]'  
  >
    <transition 
      name='page-fade'
    >
      <router-view 
        class='page'
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseAppContainer',

  computed: {
    ...mapState({
      navbarOpened: state => state.navbar.navbarOpened,
    }),
  }
}
</script>

<style lang="scss" scoped>
.base-app-container {
  position: relative;
  width: 100%;
  transition: margin-left .2s ease;

  &--nav-opened {
    margin-left: $navbar-width;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, .75);
      z-index: 100;
    }
  }
}

.page {
  position: relative;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.page-fade-enter,
.page-fade-leave-active {
  opacity: 0;
}
</style>
