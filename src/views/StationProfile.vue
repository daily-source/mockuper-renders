<template>
  <div class="profile">
    <app-header />
    <intro-video />
    <section class='profile-section'>
      <station-profile
        :station='station'
      />
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import Alert from 'LocalComponents/Alert/Alert'
import IntroVideo from 'LocalComponents/IntroVideo'
import StationProfile from 'LocalComponents/Station/StationProfile'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitDetails',

  components: {
    Alert,
    AppHeader,
    IntroVideo,
    StationProfile,
    SharedFooter,
  },

  data () {
    return {
      open: false,
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },

    ...mapState({
      /**
       * The nonprofit
       */
      station (state) {
        return state.stations.data.find(station => station.id == this.id)
      },
    })
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad Railroad'
    return {
      title: `${this.station.name} | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-section {
  padding-top: 2em;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
