<template>
  <div class="profile">
    <app-header />
    <intro-video />
    <section class='section profile__section'>
      <station-profile
        :station='station'
      />
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
      opened: true,
    }
  },

  mounted () {
  },

  methods: {
    toggleLegends () {
      this.opened = !this.opened
    },

    ...mapActions({
      changeMapStyle: 'map/changeMapStyle',
    }),
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
    const title = `${ this.stationName } | Virtual Railroad`
    return {
      title: `${ this.station.stationName || this.station.name } | Virtual Railroad`,
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
.profile {

  &__section {
    padding-top: 1.625em;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  // &__map {
  //   width: 100%;
  //   position: relative;
  //   height: 600px;
  //   overflow: hidden;
  // }

  // .home-page-actions {
  //   position: absolute;
  //   top: 10%;
  //   right: 2%;
  //   z-index: 2;
  // }
}
</style>
