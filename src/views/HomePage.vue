<template>
  <div class="layout-base">
    <app-header layout='page'/>
    <dynamic-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
    <section class='site-sample-nonprofits'>
      <nonprofit-fundraisers
        :fundraisers='fundraisers'
        class="nonprofit-fundraisers"
      >
        <h2 class='has-text-centered has-text-primary has-text-weight-bold' slot='heading'>Examples of Walk for Goods</h2>
      </nonprofit-fundraisers>
    </section>
    <shared-footer />
    <banner-switcher />
  </div>
</template>

<script>
/**
 * Replace this to respective components.
 */
import AppHeader from 'Components/WalkForGood/AppHeader.vue';
import SharedFooter from 'Components/Shared/SharedFooter.vue';
import NonprofitForm from 'Components/WalkForGood/NonprofitForm.vue';
import { mapState } from 'vuex'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    SharedFooter,
    NonprofitForm,
    NonprofitFundraisers: () => import('Components/nonprofit/NonprofitFundraisers'),
  },

  /**
   * Replace this with site's meta info.
   */
  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Walk for Good - Home',
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
  },
};
</script>

<style lang="scss" scoped>
.site-sample-nonprofits {
  padding-bottom: 3rem;
}
</style>
