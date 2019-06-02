<template>
  <!-- <div class='nonprofit-details'>
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
  </div> -->
  <div class="profile">
    <app-header />
    <intro-video />
    <section class='section'>
      <div class='container'>
        <organization-profile-comp
          :organization='organization'
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
import OrganizationProfileComp from 'LocalComponents/Organization/OrganizationProfile'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitDetails',

  components: {
    Alert,
    AppHeader,
    IntroVideo,
    OrganizationProfileComp,
    SharedFooter,
  },

  data () {
    return {
      open: true,
    }
  },

  computed: {
    ...mapState({
      /**
       * The nonprofit
       */
      organization (state) {
        return state.organization
      },
    })
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Hoya Railroad'
    return {
      title: `${this.organization.name} | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>
