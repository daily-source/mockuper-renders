<template>
  <div class="layout-base">
    <app-header />
    <dynamic-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
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
import NonprofitForm from 'Components/RideForGood/NonprofitForm.vue';

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
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
      title: 'Home',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
