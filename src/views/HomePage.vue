<template>
  <div class="layout-base">
		<app-header />
    <app-banner />
    <section class='section'>
      <h1 class='has-text-centered has-text-weight-bold'>Lose Weight for a Good Cause</h1>
      <app-description />
    </section>
    <section class='site-content'>
      <nonprofit-form />
    </section>
    <section class='site-sample-nonprofits'>
      <nonprofit-fundraisers
        :fundraisers='fundraisers'
      >
        <h2 class='has-text-centered' slot='heading'>Examples of Loseathons</h2>
      </nonprofit-fundraisers>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'Components/Loseathon/AppHeader'
import AppBanner from 'Components/Loseathon/AppBanner'
import NonprofitForm from 'LocalComponents/Loseathon/NonprofitForm'
import NonprofitFundraisers from 'Components/nonprofit/NonprofitFundraisers'
import AppDescription from 'LocalComponents/Loseathon/AppDescription'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    AppDescription,
    NonprofitForm,
    NonprofitFundraisers,
    SharedFooter,
  },

  metaInfo() {
    const description = 'A Loseathon is similar to a walkathon but instead of walking a certain distance to raise money, a person loses a certain amount of weight';
    const title = 'Raise money while losing weight!';
    return {
      title: 'Home - v1',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },
  computed: {
    ...mapState({
      nonprofit: state => state.nonprofit[this.ein],
      fundraisers: state => state.fundraisers.data,
    }),
  },

};
</script>
