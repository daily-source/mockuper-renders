<template>
  <div class="home-page">
    <!-- <splash-loader /> -->
    <!-- <intro-video /> -->
    <app-header
      :is-small='true'
      :is-home='true'
      :show-extra-contents='true'
      theme='dark'
     />
     <home-page-actions />
    <general-info 
      :opened='true'
      class='home-general-info'
    />
		<section class='home-virtual-railroad-map'>
      <home-map />	
    </section>
    <map-legends 
      :opened='opened'
      @toggle='toggleLegends'
    />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import SplashLoader from 'LocalComponents/SplashLoader'
import HomePageActions from 'LocalComponents/HomePageActions'
import HomeMap from 'LocalComponents/HomeMap'
import IntroVideo from 'LocalComponents/IntroVideo'
import GeneralInfo from 'LocalComponents/General/GeneralInfo'
import MapLegends from 'LocalComponents/MapLegends'

export default {
  name: 'BaseLayout',

  components: {
    HomeMap,
    HomePageActions,
    AppHeader,
    IntroVideo,
    GeneralInfo,
    MapLegends,
    SplashLoader,
   },
   
   data () {
     return {
       opened: true,
     }
   },

   methods :{
     toggleLegends () {
       this.opened = !this.opened
     }
   },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad';
    return {
      title: 'Home - v1 | Hoya Virtual Railroad',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
.home-page {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

header {
  position: relative;
  z-index: 1;
}

.home-page-actions {
  position: fixed;
  top: calc(10% + #{$home-header-height}); 
  right: 2%;
  z-index: 2;
}

.home-virtual-railroad-map {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: $primary;
}

.home-general-info {
  z-index: 1;
}
</style>
