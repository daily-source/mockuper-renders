<template>
  <div class="layout-base">
    <shared-header 
      :logo='require("@/assets/img/logo.png")'
    />
    <app-banner />
    <main id="content">
      <div class="container">
        <h2 class='has-text-centered home__main-heading has-text-weight-bold'>Use our websites to raise awareness of modern-day slaves and raise money to free them.</h2>
        <logo-grid />
      </div>
    </main>
    <shared-footer />
  </div>
</template>

<script>
import SharedHeader from 'Components/Shared/SharedHeader';
import AppBanner from 'Components/ForTheSlaves/AppBanner';
import LogoGrid from 'Components/ForTheSlaves/LogoGrid';
import SharedFooter from 'Components/Shared/SharedFooter';

export default {
  name: 'BaseLayout',

  components: {
    SharedHeader,
    AppBanner,
    SharedFooter,
    LogoGrid,
  },

  metaInfo() {
    const description = 'Use our websites to raise awareness of modern-day slaves and raise money to free them.';
    const title = 'For the Slaves';
    return {
      title: 'For The Slaves - Home',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>

<style lang='scss' scoped>
  .home__main-heading {
    max-width: 725px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 3rem;
  }
</style>
