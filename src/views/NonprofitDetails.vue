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
          class='nonprofit-details__alert'
        >
          Thank you for applying to be added to the Virtual Railroad. If we have any questions, we will contact you. After we review your information, we will let you know our decision via email.  Below is how your nonprofit profile page will look at Virtual Railroad. To edit it, click here.
        </alert>
        <alert
          :open='nonprofitNotClaimedAlertOpened'
          :dismissable='false'
          @closeButtonClicked='nonprofitNotClaimedAlertOpenedFlag = false'
          class='nonprofit-details__alert'
        >
          This nonprofit has already been added to the Virtual Railroad by our team, but it has not yet been claimed. To claim it so you can manage this page, click <a href="#">here</a>.
        </alert>
        <alert
          :open='nonprofitAlreadyClaimedAlertOpened'
          :dismissable='false'
          @closeButtonClicked='nonprofitAlreadyClaimedAlertOpenedFlag = false'
          class='nonprofit-details__alert'
        >
          This nonprofit is already on the Virtual Railroad and has been claimed. Please check with your team to get the login details. If you have the email but not password, use the Forgot Password feature on the <a href="#">Login screen</a> to reset it. If you can’t find the email, contact us <a href="#">here</a> and let us know you want to re-claim an existing account.
        </alert>
        <nonprofit-details-comp
          :nonprofit='nonprofit'
        />
      </div>
    </section>
     <section class="fundraisers">
      <nonprofit-fundraisers
        :fundraisers="fundraisers"
        :key="nonprofit.EIN"
        limit="5"
        section-title="Who's doing a Volunteerathon to raise money for this nonprofit?s nonprofit?"
      >
        <div slot="heading"><h2>Who's doing a fundraiser to raise money for this nonprofit?</h2></div>
      </nonprofit-fundraisers>
    </section>
    <section class="donors-fundraisers-list">
      <donors-list 
        section-title="Top Donors"
        view-all-cta=""
        :donations="donations"
        layout="horizontal"
      />
      <donors-list 
        section-title="Top Fundraisers"
        view-all-cta=""
        :donations="topFundraisers"
        layout="horizontal"
      />
    </section>
    <section class='section cta-section has-text-centered'>
      <router-link
        class="button is-large is-info is-centered nonprofit-profile_cta"
        to="/fundraiser/create"
      >Create your own fundraiser</router-link>
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
    NonprofitFundraisers: () => import('Components/nonprofit/NonprofitFundraisers.vue'),
    DonorsList: () => import('Components/general/DonorsList'),
    SharedFooter,
  },

  data () {
    return {
      open: true,
      nonprofitNotClaimedAlertOpenedFlag: this.$route.query.claim,
      nonprofitAlreadyClaimedAlertOpenedFlag: this.$route.query.claim,
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

    fromRegister () {
      return this.$route.query.fromRegister
    },

    nonprofitNotClaimedAlertOpened () {
      return this.nonprofitNotClaimedAlertOpenedFlag && !this.nonprofit.claimed
    },

    nonprofitAlreadyClaimedAlertOpened () {
      return this.nonprofitAlreadyClaimedAlertOpenedFlag && this.nonprofit.claimed
    },

    ...mapState({
      /**
       * The nonprofit
       */
      nonprofit (state) {
        return state.nonprofits.data.find(nonprofit => nonprofit.id == this.nonprofitId)
      },

      fundraisers (state) {
        return state.commonData.fundraisers.data
      },

      donations (state) {
        return state.commonData.donations.byAmount.data
      },

      topFundraisers (state) {
        return state.commonData.donations.topFundraisers.data
      },
    })
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `${this.nonprofit.name} | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-details {
  &__alert {
    padding-right: 1.25em;
  }

  .fundraisers {
    padding-top: 2rem;
  }

  .cta-section {
    padding-top: 0;
    padding-bottom: 3rem;
  }
}
</style>
