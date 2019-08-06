<template>
  <div class="view-home-page">
    <app-header />
    <section class='group-content'>
      <div class="container">
        <div class="columns">
          <div class="column is-7">
            <div class="group-content__group-details">
              <group-details />
            </div>
            <div class="group-content__participants">
              <participant 
                v-for="participant in featuredParticipants"
                :key="participant.id"
                :user="participant"
              />
              <p class='group-content__more has-text-right'>
                <a class='has-text-primary'>View all participants</a>
              </p>
            </div>
            <div class="group-content__recent-fundraisers">
              <h4 class='has-text-weight-bold'>Most Recent Fundraisers</h4>
              <fundraiser 
                v-for="(fundraiser, index) in recentFundraisers"
                :key="`recent-fundraiser-${index}`"
                :fundraiser="fundraiser"
              />
              <div class="group-content__more has-text-right">
                <a class='has-text-primary'>View all participants</a>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="group-content__donate">
              <button class='button is-primary'>Join a group</button>
              <button class='button is-primary'>Do a Fundraiser</button>
            </div>
            <fundraiser-progress 
              class='group-content__fundraiser-progress'
              cause="Catholic Relief Services"
              :goal="7000"
              :reached="3425"
            />
            <div class="group-content__largest-donors">
              <h4>Largest Donors</h4>
              <div class="group-content__donation-list">
                <donation
                  v-for="(donation, index) in featuredDonations"
                  :key="`featured-donation-${index}`"
                  :donation="donation"
                />
              </div>
            </div>
            <div class="group-content__recent-donors">
              <h4>Recent Donations</h4>
              <div class="group-content__donation-list">
                <donation 
                  v-for="(donation, index) in recentDonations"
                  :key="`recent-donations-${index}`"
                  :donation="donation"
                />
                <div class="group-content__more has-text-right">
                  <a href="#"> View all Donatons </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    /**
     * TODO: Components below are stored as local components because they're
     * just placeholder components and are just used as a basis for future site
     * components. When a site is being developed, all components should be
     * placed on the `xthon-core` components folder.
     */
    AppHeader: () => import("LocalComponents/general/AppHeader"),
    GroupDetails: () => import("LocalComponents/general/GroupDetails"),
    Participant: () => import("LocalComponents/general/Participant"),
    Fundraiser: () => import("LocalComponents/general/Fundraiser"),
    FundraiserProgress: () => import("LocalComponents/general/FundraiserProgress"),
    Donation: () => import("LocalComponents/general/Donation"),
    SharedFooter: () => import('Components/Shared/SharedFooter'),
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
    },

    ...mapGetters({
      featuredParticipants: 'users/featuredParticipants',
      recentFundraisers: 'userFundraisers/recentFundraisers',
      featuredDonations: 'donations/getFeaturedDonations',
      recentDonations: 'donations/recentDonations',
    })
  }
}
</script>

<style scoped lang="scss">
.group-content {
  padding-top: 1rem;
  padding-bottom: 1rem;

  &__more {
    padding-top: .5rem;
  }

  &__recent-fundraisers {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  h4 {
    font-size: 1.5rem;
    margin-bottom: .5rem;
    font-weight: 700;
  }

  &__donate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .button {
      height: auto;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 4px;
      background-color: lighten($primary, 30%);
      border-color: lighten($primary, 30%);
      font-size: .875em;
    }
  }

  &__donation-list {
    padding: 1.5em 1em;
    border: 1px solid #a3a3a3;
  }

  &__fundraiser-progress {
    margin-bottom: 1em;
  }

  &__largest-donors {
    margin-bottom: 1rem;
  }
}

.instructions {
  padding-top: 3em;

  p {
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
