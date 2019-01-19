<template>
  <div class="layout-base">
    <intro-video />
    <app-header />
		<virtual-railroad-map />
		<shared-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'
import IntroVideo from 'LocalComponents/IntroVideo'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
		VirtualRailroadMap,
    IntroVideo,
    SharedFooter,
 	},

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad';
    return {
      title: 'Home | Virtual Railroad',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

  computed: {
    ...mapState({
      isPlaying: state => state.video.isPlaying,
    })
  },
};
</script>
