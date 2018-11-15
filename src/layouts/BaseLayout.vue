<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <main class="site-content" id="content">
      <slot></slot>
    </main>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/RideForGood/AppHeader.vue';
import AppBanner from '@/components/RideForGood/AppBanner.vue';
import SharedFooter from '@/components/RideForGood/SharedFooter.vue';

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    SharedFooter,
  },

};
</script>
