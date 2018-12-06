<template>
  <div class="layout-base">
    <app-header />
    <site-content />
    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import AppHeader from '@/components/ForLearning/AppHeader.vue'
import SiteContent from '@/components/ForLearning/SiteContent.vue'
import SharedFooter from '@/components/general/SharedFooter.vue'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    SiteContent,
    SharedFooter,
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
