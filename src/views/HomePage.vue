<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/RuleYourWorld/AppHeader.3'
import AppBanner from 'Components/RuleYourWorld/AppBanner.3'
import NonprofitForm from 'Components/RuleYourWorld/NonprofitForm.3'
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
      title: 'Home - v3',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
