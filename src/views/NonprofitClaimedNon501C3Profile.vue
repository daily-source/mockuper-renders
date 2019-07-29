<template>
  <div class="unclaimed-non-501">
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
    NonprofitAbout: () => import('LocalComponents/Nonprofit/NonprofitAbout'),
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
        return state.nonprofits.claimedNon501
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
.unclaimed-non-501 {
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
.unclaimed-non-501 {
  .nonprofit-about {
    h2 {
      display: none;
    }
  }

  .nonprofit-extended {
    margin-bottom: 0 !important;
     
    &__separator {
      padding-top: .75rem !important;
    }
  }
}
</style>
