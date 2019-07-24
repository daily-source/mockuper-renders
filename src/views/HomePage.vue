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
import SharedFooter from 'Components/Shared/SharedFooter.vue'
import RaiseAwarenessGrid from 'Components/ForThePoor/RaiseAwarenessGrid'
import RaiseMoneyGrid from 'Components/ForThePoor/RaiseMoneyGrid.vue';

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
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

    const siteTitle = process.env.NODE_ENV === 'development' ?
      `For The Poor - v${this.$version}` :
      'For the Poor - Home'

    return {
      title: siteTitle,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },
  /**
   * Return stored data for this view.
   */
  computed: {
    home () {
      return this.$store.state.home
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  &__main-heading {
    max-width: 730px;
    margin-left: auto;
    margin-right: auto;
    font-size: 2.375rem;
    font-family: $font-family-base;
    line-height: 45px;
    line-height: 1.5;
    color: $primary;
    margin-bottom: 0;

    &--secondary {
      color: $secondary;
    }
  }

  &__sub-heading {
    color: #4a4a4a;
    font-size: 1.5rem;
    font-weight: 400 !important;
    padding-bottom: 3rem;
    font-family: $font-primary;
    margin-bottom: 0;
  }

  .grid-section {
    margin-bottom: 3rem;
  }
}
</style>
