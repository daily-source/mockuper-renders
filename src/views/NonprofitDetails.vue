<template>
  <div class='nonprofit-details'>
    <app-header />
    <intro-video />
    <section class='section'>
      <div class='container'>
        <alert
          v-if='newNonprofit'
          :open='open'
          @closeButtonClicked='open = false'
        >
          Nonprofit successfuly registered. Below are the information you registered.
        </alert>
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
import Alert from 'LocalComponents/Alert/Alert'
import IntroVideo from 'LocalComponents/IntroVideo'
import NonprofitDetailsComp from 'LocalComponents/Nonprofit/NonprofitDetails'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitDetails',

  components: {
    Alert,
    AppHeader,
    IntroVideo,
    NonprofitDetailsComp,
    SharedFooter,
  },

  data () {
    return {
      open: true,
    }
  },

  computed: {
    /**
     * The nonprofit ID from the route parameters
     */
    nonprofitId () {
      return this.$route.params.nonprofitId
    },

    newNonprofit () {
      return this.$route.query.newNonprofit
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

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `${this.nonprofit.name} | Virtual Railroad -v2`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>
