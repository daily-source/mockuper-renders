<template>
  <div class="draft-page">
    <app-header />
    <dynamic-banner>
      <div class="container">
        <h1>Push yourself to your limits, do challenges and support the charity of your choice.</h1>
      </div>
    </dynamic-banner>
    <div class='instructions'>
      <div class='container'>
        <p>
          An extreme challenge is all it will take to kick start your fundraising. Remember how the ice bucket challenge went viral? Extreme charity challenges have the capacity to grab attention, getting your supporters to really engage with the story of your cause.
        </p>
      </div>
    </div>
    <div class="home__form">
      <div class="container">
        <div class="home__form-container">
          <div class="columns">
            <div class="column is-6">
              <nonprofit-form v-if='$version == 1'/>
              <nonprofit-form-2 v-else-if='$version == 2'/>
            </div>
            <div class="column is-6">
              <img src="@/assets/img/images/sample.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <shared-footer />
  </div>
</template>

<script>
export default {
  name: 'DraftPage',

  components: {
    SharedFooter: () => import("Components/Shared/SharedFooter.vue"),
    AppHeader: () => import("Components/CharitableChallenges/AppHeader.vue"),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    SampleForm: () => import("LocalComponents/SampleForm.vue"),
    NonprofitForm: () => import('Components/CharitableChallenges/NonprofitForm'),
    NonprofitForm2: () => import('Components/CharitableChallenges/NonprofitForm.2')
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
      title: "Chartiable Challenges - Home",
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  }

}
</script>

<style scoped lang="scss">
.instructions {
  padding-top: 3em;

  p {
    @include tablet {
      font-size: 1.25rem;
      padding-left: 60px;
      padding-right: 60px;
    }
  }
}

.home__form-container {
  // max-width: 800px;
  // margin-left: auto;
  padding-bottom: 3em;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}
</style>

