<template>
  <div class="view-home-page">
    <app-header 
      volunteer-text='Do one now'
      layout='page'
    />
    <TopMenu></TopMenu>
    <dynamic-banner>
      <h1>
        Tools and steps for more <br />
        peace, love and goodness<br />
        for you and the world
      </h1>
    </dynamic-banner>
    <section class="logo-grid-wrapper">
      <logo-grid 
        v-for='site in sites'
        :key='site.slug'
        :logos='site.logos'
        :title='site.title'
        :slug='site.slug'
      />
    </section>
    <SharedFooter></SharedFooter>
    <banner-switcher />
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    AppHeader: () => import("Components/BridgesToGod/AppHeader.vue"),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    HomeSection2: () => import("Components/Volunteerathon/HomeSection2.vue"),
    HomeSection3: () => import("Components/Volunteerathon/HomeSection3.vue"),
    HomeSection4: () => import("Components/Volunteerathon/HomeSection4.vue"),
    SampleForm: () => import("LocalComponents/SampleForm.vue"),
    LogoGrid: () => import('Components/BridgesToGod/LogoGrid'),
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
      title: "Bridges to God - v2",
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
    },

    ...mapState({
      sites: state => state.sites.data,
    })
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
