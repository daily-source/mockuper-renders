<template>
  <div class="view-home-page">
    <app-header 
      volunteer-text='Do one now'
      layout='page'
    />
    <TopMenu></TopMenu>
    <dynamic-banner>
      <h1>Raise money for a cause you support</h1>
    </dynamic-banner>
    <div class='instructions'>
      <div class='container'>
        <p>
          <span class='has-text-weight-bold'>WEB DEVELOPER:</span> when the fundraising activity section is completed at the nonprofit profile page, normally you should copy it here so that users can start creating their fundraiser from the front page. For some websites, we don’t use that approach. But normally we do.   
        </p>
        <p>
          <span class='has-text-weight-bold'>ALSO:</span> often a short piece of text in put inside of the banner photo.
        </p>
      </div>
    </div>
    <sample-form 
      submit-button-label='Submit' 
      :show-also-section='false'
    />
    <SharedFooter></SharedFooter>
    <banner-switcher />
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    SharedFooter: () => import("Components/Shared/SharedFooter.vue"),
    AppHeader: () => import("Components/general/AppHeader.vue"),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    HomeSection2: () => import("Components/Volunteerathon/HomeSection2.vue"),
    HomeSection3: () => import("Components/Volunteerathon/HomeSection3.vue"),
    HomeSection4: () => import("Components/Volunteerathon/HomeSection4.vue"),
    SampleForm: () => import("LocalComponents/SampleForm.vue")
  },

  /**
   * Fetch data and store it just before entering the view.
   */
  asyncData ({ store, route: { params: { ein } } }) {
    return new Promise((resolve, reject) => {
      return store.dispatch("FETCH_HOME_PAGE")
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
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
      title: "50/50 Raffle - v1",
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
