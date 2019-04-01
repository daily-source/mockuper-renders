<template>
  <div class="layout-base">
    <shared-header 
      :logo='require("@/assets/img/logo.png")'
    />
    <app-banner />
    <main id="content">
      <section class='grid-section'>
        <div class="container">
          <h2 class='has-text-centered home__main-heading has-text-weight-bold'> Raise Awareness </h2>
          <h3 class='has-text-centered home__sub-heading has-text-weight-bold is-marginless'>Make others aware of the climate change threat and the environment </h3>
          <raise-awareness-grid />
        </div>
      </section>
      <section class='grid-section'>
        <div class="container">
          <h2 class='has-text-centered home__main-heading home__main-heading--secondary has-text-weight-bold has-text-secondary'> Raise Money </h2>
          <h3 class='has-text-centered home__sub-heading has-text-weight-bold'>Generate donations to change the lives of the poor. </h3>
          <raise-money-grid />
        </div>
      </section>
    </main>
    <shared-footer />
  </div>
</template>

<script>
import SharedHeader from 'Components/Shared/SharedHeader'
import AppBanner from 'Components/ForTheEarth/AppBanner'
import SharedFooter from 'Components/Shared/SharedFooter'
import RaiseAwarenessGrid from 'Components/ForTheEarth/RaiseAwarenessGrid'
import RaiseMoneyGrid from 'Components/ForTheEarth/RaiseMoneyGrid';

export default {
  name: 'BaseLayout',

  components: {
    SharedHeader,
    AppBanner,
    RaiseAwarenessGrid,
    RaiseMoneyGrid,
    SharedFooter,
  },

  metaInfo() {
    const description = 'A collection of sites to raise awareness and raise money for the earth.';
    const title = 'For the Earth!';
    return {
      title: 'For the Earth - v1',
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
    max-width: 730px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.875rem;
    color: $primary;

    &--secondary {
      color: $secondary;
    }
  }

  .home__sub-heading {
    font-size: 1.5rem;
    font-weight: 400 !important;
    padding-bottom: 3rem;
    color: #4a4a4a;
    font-family: $font-family-base;
  }

  .home .grid-section {
    margin-bottom: 3rem;
  }
</style>
