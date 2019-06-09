<template>
  <div class="layout-base">
    <app-header />
    <app-banner />
    <NonprofitForm :enable-nonprofit-search="true"></NonprofitForm>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/RuleYourWorld/AppHeader.3'
import AppBanner from 'Components/RuleYourWorld/AppBanner.3'
import NonprofitForm from 'Components/RuleYourWorld/NonprofitForm.3'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppHeader,
    AppBanner,
    NonprofitForm,
    SharedFooter,
  },

  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = "Double the results, half the effort. A Volunteerathon® lets you make a far greater impact with your time than traditional fundraising events."
    var title = "Create a volunteerathon and do good!"
    return {
      title: 'Home - v3',
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

<style scoped lang="scss">
.instructions {
  padding-top: 3em;

  p {
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
