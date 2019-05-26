<template>
  <div class="layout-base">
		<app-header />
    <app-banner />
    <section class='section description'>
      <h2>Lose Weight for a Good Cause</h2>
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

import AppHeader from 'Components/Loseathon/AppHeader.4'
import AppBanner from 'Components/Loseathon/AppBanner.3'
import NonprofitForm from 'LocalComponents/Loseathon/NonprofitForm'
import NonprofitFundraisers from 'LocalComponents/nonprofit/NonprofitFundraisers'
import AppDescription from 'LocalComponents/Loseathon/AppDescription'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: "HomePage",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
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
      title: 'Loseathon - v4',
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },
  computed: {
    ...mapState({
      nonprofit: state => state.nonprofit[this.ein],
      fundraisers: state => state.fundraisers.data,
    }),
  },

};
</script>

<style lang='scss' scoped>
.description {
  padding-bottom: .5em;

  h2 {
    font-weight: 700;
    text-align: center;
  }
}

.instructions {
  padding-top: 3em;

  p {
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
