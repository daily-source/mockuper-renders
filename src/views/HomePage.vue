<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import AppHeader from '@/xthon-core/lib/components/RideForGood/AppHeader.vue';
import AppBanner from '@/xthon-core/lib/components/RideForGood/AppBanner.vue';
import SharedFooter from '@/xthon-core/lib/components/RideForGood/SharedFooter.vue';
import NonprofitForm from '@/xthon-core/lib/components/Volunteerathon/NonprofitForm.vue';

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    SharedFooter,
    NonprofitForm,
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
