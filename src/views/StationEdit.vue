<template>
  <div class="station-edit">
    <app-header />
    <section class='station-edit__section section'>
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
import SharedFooter from 'Components/Shared/SharedFooter'
import StationProfile from 'LocalComponents/Station/StationProfile';

export default {
  name: 'StationEdit',

  components: {
    AppHeader,
    StationProfile,
    SharedFooter,
  },

  computed: {
    stationId () {
      return this.$route.params.id
    },

    ...mapState({
      station (state) {
        return state.stations.data.find(station => station.id == this.stationId)
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.station-edit {
  &__section {
    padding-top: 1.625em;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
