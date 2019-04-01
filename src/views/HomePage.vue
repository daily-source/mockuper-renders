<template>
  <div class="layout-base home">
    <shared-header 
      :logo='require("@/assets/img/logo.png")'
    />
    <app-banner />
    <main id="content">
      <section class='grid-section'>
        <div class="container">
          <h2 class='has-text-centered home__main-heading has-text-weight-bold'> Raise Awareness </h2>
          <h3 class='has-text-centered home__sub-heading has-text-weight-bold'>Make others aware of the plight of the poor. </h3>
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
    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import SharedHeader from 'Components/Shared/SharedHeader.vue';
import AppBanner from 'Components/ForThePoor/AppBanner.vue';
import SharedFooter from 'Components/Shared/SharedFooter.vue';
import RaiseAwarenessGrid from 'Components/ForThePoor/RaiseAwarenessGrid';
import RaiseMoneyGrid from 'Components/ForThePoor/RaiseMoneyGrid.vue';

export default {
  name: 'BaseLayout',

  components: {
    SharedHeader,
    AppBanner,
    SharedFooter,
    RaiseAwarenessGrid,
    RaiseMoneyGrid,
  },

  metaInfo() {
    const description = 'See many ways to help the poorest half of the peopls.';
    const title = 'For the Poor!';
    return {
      title: 'For the Poor - Home',
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
    font-size: 2.375rem;
    color: $primary;

    &--secondary {
      color: $secondary;
    }
  }

  .home__sub-heading {
    color: #4a4a4a;
    font-size: 1.5rem;
    font-weight: 400 !important;
    padding-bottom: 3rem;
    font-family: 'Poppins';
  }

  .home .grid-section {
    margin-bottom: 3rem;
  }
</style>
