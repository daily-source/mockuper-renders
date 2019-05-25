<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/RuleYourWorld/AppHeader.2'
import AppBanner from 'Components/RuleYourWorld/AppBanner.2'
import NonprofitForm from 'Components/RuleYourWorld/NonprofitForm.2'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    NonprofitForm,
    SharedFooter,
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Home - v2',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
