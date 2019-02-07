<template>
  <div class="layout-base">
    <app-header />
    <app-content />
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/InSightInMind/AppHeader'
import AppContent from '@/components/InSightInMind/AppContent'
import SharedFooter from '@/components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppContent,
    SharedFooter,
  },

  metaInfo() {
    const description = 'Caring for the poorest half!';
    const title = 'In sight In Mind - v1';
    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
