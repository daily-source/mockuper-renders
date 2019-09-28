<template>
  <div class="layout-base">
    <app-header 
      layout='page'
    />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true" :bubbles='false'></NonprofitForm>
    <section class='site-sample-nonprofits'>
      <nonprofit-fundraisers
        :fundraisers='fundraisers'
        class="nonprofit-fundraisers"
      >
        <h2 class='has-text-centered has-text-primary has-text-weight-bold' slot='heading'>Examples of Run for Goods</h2>
      </nonprofit-fundraisers>
    </section>
    <shared-footer />
  </div>
</template>

<script>
/**
 * Replace this to respective components.
 */
import AppHeader from 'Components/RunForGood/AppHeader.vue';
import AppBanner from 'Components/RunForGood/AppBanner.vue';
import SharedFooter from 'Components/Shared/SharedFooter.vue';
import NonprofitForm from 'Components/RunForGood/NonprofitForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    SharedFooter,
    NonprofitForm,
    NonprofitFundraisers: () => import('Components/nonprofit/NonprofitFundraisers')
  },

  /**
   * Replace this with site's meta info.
   */
  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Run for Good - v1',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

  computed: {
    ...mapState({
      fundraisers: state => state.fundraisers.data,
    }),
  }
};
</script>

<style lang="scss" scoped>
.site-sample-nonprofits {
  // padding-top: 1.5em;
  padding-bottom: 2.5em;
}
</style>
