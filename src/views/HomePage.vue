<template>
  <div class="view-home-page">
    <app-header />
    <versioned-component 
      base-name='BoxesGrid'
    />
    <div class="home-page-info">
      <h4 class='has-text-grey has-text-weight-bold has-text-centered'>Hover your mouse over a cause for more information.</h4>
      <p class='has-text-centered'>
        <a href="#" class='home-page-info__more'>For links to information in this graphic, click here.</a>
      </p>
      <p class='has-text-centered is-marginless'>
        <a href="#" class='button help-now-button is-large is-secondary has-text-weight-bold is-uppercase'>Help Now</a>
      </p>
    </div>
    <shared-footer />
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
    AppHeader: () => import("Components/InSightInMind/AppHeader.vue"),
    SharedFooter: () => import("Components/Shared/SharedFooter.vue"),
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
      title: "Home",
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

.home-page-info {
  padding-bottom: 1em;

  h4 {
    margin-bottom: .875rem;
    font-size: 1em;

    @include tablet {
      font-size: 1.375rem;
    }
  }

  &__more {
    font-size: 1.125em;
    color: #676767;
  }
}
</style>
