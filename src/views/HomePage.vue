<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/RuleYourWorld/AppHeader'
import AppBanner from 'Components/RuleYourWorld/AppBanner'
import NonprofitForm from 'Components/RuleYourWorld/NonprofitForm'
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
      title: 'Home - v1',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
