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
import AppHeader from 'Components/RideForGood/AppHeader.vue'
import AppBanner from 'Components/RideForGood/AppBanner.vue'
import SharedFooter from 'Components/RideForGood/SharedFooter.vue'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
    SharedFooter
  },

}
</script>

