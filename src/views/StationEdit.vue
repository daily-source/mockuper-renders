<template>
  <div class="station-edit">
    <app-header />
    <section class='section'>
      <div class="container">
        
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'StationEdit',

  components: {
    AppHeader,
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
