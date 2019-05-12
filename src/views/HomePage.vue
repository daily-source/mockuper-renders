<template>
  <div class="view-home-page">
    <app-header 
      volunteer-text='Do one now'
      layout='page'
    />
    <top-menu />
    <app-banner />
    <div class='nonprofit-info'>
      <div class='container'>
        <div class="nonprofit-info__container">
          <p>Normal charity rides are held only one day of the year in one city. If you can’t be in that city on that day, you can’t raise money. A Ride For Good can be done any day of the year anywhere in the world. You also have flexibility to do your own ride, organize a group ride or join an existing ride. With a Ride for Good, you can ride and raise money your way.</p>
        </div>
      </div>
    </div>
    <NonprofitForm submit-button-label="Submit" :enable-nonprofit-search="false">
      <div slot="heading"><h1>Change the world in 3 easy steps:</h1></div>
    </NonprofitForm>
    <shared-footer />
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "HomePage",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    SharedFooter: () => import("Components/Shared/SharedFooter.vue"),
    NonprofitForm: () => import("Components/RideForGood/NonprofitForm"),
    AppHeader: () => import("Components/RideForGood/AppHeader.vue"),
    AppBanner: () => import('Components/RideForGood/AppBanner'),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
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
      title: "Ride for Good - v1",
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

.nonprofit-info {
  padding-top: 3em;
  
  &__container {
    margin-left: auto;
    margin-right: auto;

    @include desktop {
      max-width: 86%;
    }

    p {
      font-size: 1rem;

      @include fullhd {
        font-size: 1.125rem;
      }
    }

    ul {
      margin-left: 2em;
    }
  }

  ul {
    list-style: disc;

    li {
      margin-bottom: .5em;

      @include fullhd {
        font-size: 1.125rem;
      }
    }
  }
}
</style>
