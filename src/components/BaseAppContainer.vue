<template>
  <div 
    :class='["base-app-container", {"base-app-container--nav-opened": navbarOpened}]'  
  >
    <!--TODO: Define custom page transitions.  -->
    <router-view />
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
  height: 100vh;
  overflow: hidden;
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
</style>
