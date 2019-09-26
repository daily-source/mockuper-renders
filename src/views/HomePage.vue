<template>
  <div class="layout-base">
    <app-header 
      layout='page'
    />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true" :bubbles='false'></NonprofitForm>
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

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    SharedFooter,
    NonprofitForm,
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

};
</script>
