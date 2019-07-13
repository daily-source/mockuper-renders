<template>
  <div class="view-home-page">
    <app-header
      :class="`header--v${$version}`"
      volunteer-text='Do one now'
      layout='page'
    />
    <TopMenu
      :class="`top-menu--v${$version}`"
    ></TopMenu>
    <versioned-component 
      base-name='AppBanner'
    />
    <div class='instructions'>
      <h1 class=' has-text-centered instructions__heading' v-if='$version == 1'>Amuse your friends and raise money for good.</h1>
      <h1 class=' has-text-centered instructions__heading instructions__heading--v2' v-else-if='$version == 2'>Grow a beard or moustache to entertain <br /> your friends and raise money for good.</h1>
      <h1 class=' has-text-centered instructions__heading instructions__heading--v3' v-else-if='$version == 3'>Grow a beard to entertain your friends <br />and raise money for good</h1>
      <div class='container'>
        <p>
          WEB DEVELOPER: when the fundraising activity section is completed at the nonprofit profile page, normally you should copy it here so that users can start creating their fundraiser from the front page. For some websites, we don’t use that approach. But normally we do.   
        </p>
        <p>
          ALSO: often a short piece of text in put inside of the banner photo.
        </p>
      </div>
    </div>
    <sample-form 
      submit-button-label='Submit' 
      :show-also-section='false'
    />
    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import Loader from 'Components/Shared/Loader'
import AppHeader from 'Components/GrowOneForGood/AppHeader'

Vue.use(VueMeta)

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    SharedFooter: () => import("Components/Shared/SharedFooter.vue"),
    AppHeader: () => import("Components/GrowOneForGood/AppHeader.vue"),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    SampleForm: () => import("LocalComponents/SampleForm.vue"),
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

  data () {
    return {
      headerComponent: null,
      header: null,
    }
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
      title: `Grow One For Good - v${this.$version}`,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },

  methods: {
    setHeaderComponent () {
      const comp = () => import(`Components/GrowOneForGood/AppHeader`)

      this.headerComponent = comp
    },
      
  },

  /**
   * Return stored data for this view.
   */
  computed: {
    bannerComponent () {
      if ((this.$version && this.$version != 2) || this.$version === undefined) {
        return 'dynamic-banner'
      }

      const comp = () => import('Components/GrowOneForGood/AppBanner')

      return comp
    },
  },
}
</script>

<style scoped lang="scss">
.instructions {
  padding-top: 3em;

  &__heading {
    font-size: 38px;
    padding-bottom: 3rem;
    margin-bottom: 0;
    color: $primary;

    &--v2 {
      color: $secondary;
    }
  }

  p {
    font-size: 20px;
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
