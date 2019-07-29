<template>
  <div class="unclaimed-501">
    <app-header />
    <intro-video />
    <section class="nonprofit-details section">
      <div class="container">
        <nonprofit-details 
          :nonprofit='nonprofit'
          :show-fundraise-button='true'
        />
      </div>
    </section>
    <section class="nonprofit-about">
      <nonprofit-about 
        v-if='transformedNonprofit'
        :nonprofit='transformedNonprofit'
      />
    </section>
    <section class="fundraisers">
      <nonprofit-fundraisers
        :fundraisers="fundraisers"
        :key="nonprofit.EIN"
        limit="5"
        section-title="Who's doing a Volunteerathon to raise money for this nonprofit?s nonprofit?"
      >
        <div slot="heading"><h2>Who's doing a INSERT FUNDRAISER to raise money for this nonprofit?</h2></div>
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
    <section class='section cta-section'>
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
import { transformNonprofit } from '@/util/api'

export default {
  name: 'Unclaimed501C3Profile',

  components: {
    AppHeader: () => import('LocalComponents/AppHeader'),
    IntroVideo: () => import('LocalComponents/IntroVideo'),
    NonprofitDetails: () => import('LocalComponents/Nonprofit/NonprofitDetails'),
    NonprofitAbout: () => import('Components/nonprofit/NonprofitAbout'),
    NonprofitFundraisers: () => import('Components/nonprofit/NonprofitFundraisers.vue'),
    DonorsList: () => import('Components/general/DonorsList'),
    SharedFooter: () => import('Components/Shared/SharedFooter'), 
  },

  computed: {
    transformedNonprofit () {
      return transformNonprofit(this.nonprofit, true)
    },

    ...mapState({
      nonprofit (state) {
        return state.nonprofits.unclaimed501
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
}
</script>

<style lang='scss' scoped>
.unclaimed-501 {
  .nonprofit-details {
    padding-bottom: 0;
  }

  .cta-section {
    text-align: center;
    padding-top: 0;
    padding-bottom: 3rem;
  }
}
</style>

<style lang='scss'>
.unclaimed-501 {
  .nonprofit-about {
    h2 {
      display: none;
    }
  }

  .nonprofit-extended {
    &__separator {
      padding-top: .75rem;
    }
  }
}
</style>
