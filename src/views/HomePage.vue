<template>
  <div class="home-page">
    <intro-video />
    <app-header
      :is-small='false'
      :show-extra-contents='false'
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
      title: 'Home - v3 | Virtual Railroad',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },
};
</script>

<style lang='scss'scoped>
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
  top: 10%;
  right: 2%;
  z-index: 2;
}

.home-virtual-railroad-map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: $primary;
}

.home-general-info {
  z-index: 1;
}
</style>
