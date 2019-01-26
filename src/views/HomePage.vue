<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <give-it-up-form />
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/GiveItUp/AppHeader.vue';
import AppBanner from 'Components/GiveItUp/AppBanner.vue';
import SharedFooter from 'Components/Shared/SharedFooter.vue';
import GiveItUpForm from '@/components/GiveItUp/GiveItUpForm'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    SharedFooter,
    GiveItUpForm,
  },

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
