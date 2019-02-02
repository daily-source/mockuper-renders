<template>
  <div class='nonprofit-details'>
    <app-header />
    <intro-video />
    <section class='section'>
      <div class='container'>
        <nonprofit-details-comp
          :nonprofit='nonprofit'
        />
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import NonprofitDetailsComp from 'LocalComponents/Nonprofit/NonprofitDetails'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitDetails',

  components: {
    AppHeader,
    IntroVideo,
    NonprofitDetailsComp,
    SharedFooter,
  },

  computed: {
    /**
     * The nonprofit ID from the route parameters
     */
    nonprofitId () {
      return this.$route.params.nonprofitId
    },

    ...mapState({
      /**
       * The nonprofit
       */
      nonprofit (state) {
        return state.nonprofits.data.find(nonprofit => nonprofit.id == this.nonprofitId)
      },
    })
  },
}
</script>
