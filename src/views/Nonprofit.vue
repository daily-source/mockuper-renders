<template>
  <div class="">
    <app-header 
      layout="app"
      volunteer-text='Do one now'
    />

    <transition name="slide-fade">
      <DonateView
        v-if="donateActive"
        parent="nonprofit"
        v-on:close="closeDonation()"
      ></DonateView>
    </transition>

    <NonprofitHero
      :nonprofit="nonprofit"
      :common="common"
      :editing="enableEditionForThisNonprofit"
      v-on:edit:open="enableEdition()"
      v-on:edit:close="closeEdition()"
    ></NonprofitHero>


    <div class='nonprofit-info'>
      <div class='container'>
        <div class="nonprofit-info__container">
          <p>
            In this section, we should normally put an introduction to and explanation of the fundraising activity. These margins/indents and font sizes usually work well, but you can adjust the margin and font sizes as needed to make the section look nice. Sometimes we also have bulleted items like:
          </p>
          <ul>
            <li>Sometimes the bulleted items are used to give a list of benefits of the fundraising activity or approach
            </li>
            <li>But they can be used for other lists</li>
            <li>They are not required, so it’s fine to delete them</li>
            <li>If you have many bullets, or if the text in them is long, you might need to increase the empty space between each bullet a little.
            </li>
            <li><span class='has-text-weight-bold'>IMPORTANT:</span> change the color of heading below this to one of the colors in the logo</li>
          </ul>
        </div>
      </div>
    </div>

    <GenericForm submit-button-label="Submit" :enable-nonprofit-search="true" :bubbles='true'>
      <div slot="heading"><h1>Change the world in 3 easy steps:</h1></div>
    </GenericForm>

    <FloatingShareTools text="Check out this nonprofit!" via="Volunteerathon" title="Share this" />


    <NonprofitAbout
      :nonprofit="nonprofit"
      :editing="enableEditionForThisNonprofit"
      :can-edit="canManageThisNonprofit"
      :key="_uid + nonprofit.EIN"
      v-on:edit:open="enableEdition()"
      v-on:edit:close="closeEdition()"
    ></NonprofitAbout>

    <NonprofitFundraisers
      :fundraisers="fundraisers"
      :key="nonprofit.EIN"
      limit="5"
      section-title="Who's doing a Volunteerathon to raise money for this nonprofit?s nonprofit?"
    >
      <div slot="heading"><h2>Who's doing a Altruistic Anniversary to raise money for this nonprofit?</h2></div>
    </NonprofitFundraisers>

    <DonorsList
      section-title="Top Donors"
      view-all-cta=""
      :donations="donations"
      layout="horizontal"
    ></DonorsList>

    <DonorsList
      section-title="Top Fundraisers"
      view-all-cta=""
      limit="6"
      :donations="topFundraisers"
      layout="horizontal"
    ></DonorsList>

    <section>
      <router-link
        class="button is-large is-info is-centered fundraiser_cta"
        to="/fundraiser/create"
      >Create your own fundraiser</router-link>
    </section>
    <SharedFooter></SharedFooter>

    <RegisterOrLoginModal
      layout="comment"
      :state="showLoginModal"
      v-on:logged:in="enableEdition()"
      v-on:modal:close="showLoginModal = false"
    >
      <div slot="heading">Please log in</div>
      <div slot="intro">
        <p class="is-centered">To manage this nonprofit, you need to be logged in. Please log in here or register for a free account.</p>
      </div>
    </RegisterOrLoginModal>
    <ClaimNonprofitModal
      layout="comment"
      :state="showClaimNonprofitModal"
      v-on:logged:in="enableEdition()"
      v-on:modal:close="showClaimNonprofitModal = false"
    >
    </ClaimNonprofitModal>

  </div>
</template>

<script>
import Vue from 'vue';
import VueMeta from 'vue-meta';
import RegisterOrLoginModal from 'Components/general/RegisterOrLoginModal.vue';
import ClaimNonprofitModal from 'Components/nonprofit/ClaimNonprofitModal.vue';

Vue.use(VueMeta);

export default {
  name: 'nonprofit',
  data() {
    return {
      showLoginModal: false,
      showClaimNonprofitModal: false,
      enableEditionForThisNonprofit: false,
    };
  },
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    SharedFooter: () => import('Components/Shared/SharedFooter.vue'),
    AppHeader: () => import('Components/AltruisticAnniversaries/AppHeader.vue'),
    NonprofitHero: () => import('Components/nonprofit/NonprofitHero.vue'),
    DonateView: () => import('./DonateView.vue'),
    DonorsList: () => import('Components/general/DonorsList.vue'),
    FloatingShareTools: () => import('Components/general/FloatingShareTools.vue'),
    NonprofitAbout: () => import('Components/nonprofit/NonprofitAbout.vue'),
    NonprofitFundraisers: () => import('Components/nonprofit/NonprofitFundraisers.vue'),
    GenericForm: () => import('Components/nonprofit/GenericForm.vue'),
    RegisterOrLoginModal,
    ClaimNonprofitModal,
  },
  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo() {
    const activity = this.nonprofit.NTEE_CD !== '0'
      ? `NTEE Classification: ${this.nonprofit.NTEE_CD}`
      : `Activity: ${this.nonprofit.ACTIVITY}`;
    const description = `Tax exempt organization. ${activity}`;
    const name = this.nonprofit.NAME;
    const imgSrc = this.nonprofit.data.hero ? this.nonprofit.data.hero.src : this.nonprofit.data.default_hero.src;
    const imgUrl = `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}${imgSrc}`;
    return {
      title: name,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: name },
        { vmid: 'og:description', property: 'og:description', content: description },
        { vmid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
        { vmid: 'og:image:width', property: 'og:image:width', content: '1024' },
        { vmid: 'og:image:height', property: 'og:image:height', content: '340' },
        { vmid: 'og:image', property: 'og:image', content: imgUrl },
      ],
    };
  },
  computed: {
    ein() {
      return this.$route.params.ein || 1;
    },
    nonprofit() {
      return this.$store.state.nonprofit[this.ein];
    },
    fundraisers() {
      return this.$store.state.fundraisers.data;
    },
    donations() {
      return this.$store.state.donations.byAmount.data;
    },
    topFundraisers() {
      return this.$store.state.donations.topFundraisers.data;
    },
    common() {
      return this.$store.state.common;
    },
    donateModal() {
      return this.$route.name;
    },
    donateActive() {
      return this.donateModal.includes('/donate');
    },
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    canManageThisNonprofit() {
      return false;
    },
  },

  /**
   * Exclude the fundraisers, donors and top donors blocks from getting rendered in the server.
   * This speeds up the process and reduces the size of the document (so TTFB improves).
   */
  mounted() {
    //this.loadFundraisers();
    this.loadMoreDonations();
    this.loadMoreTopFundraisers();
    this.loadNonprofitData();
  },
  methods: {
    loadNonprofitData () {
      if (this.$store.state.nonprofit.hasOwnProperty(this.ein)) {
        return
      } 
      return new Promise((resolve, reject) => {
        return this.$store.dispatch("FETCH_NONPROFIT", { ein: this.ein })
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })

    },
    /**
     * Fetch fundraisers for this EIN. If no fundraisers are returned, reset the store info,
     * so that it doesn't display info from other nonprofits.
     */
    loadFundraisers(paginated = true) {
      return this.$store.dispatch('FETCH_FUNDRAISERS', { ein: this.$route.params.ein })
        .then(data => data)
        .catch((err) => {
          this.$store.commit('RESET_FUNDRAISERS');
          return err;
        });
    },
    loadMoreDonations(paginated = true) {
      const nonprofitEIN = this.ein;
      return this.$store.dispatch('FETCH_DONATIONS', { nonprofitEIN, paginated })
        .then(data => data)
        .catch(err => err);
    },
    loadMoreTopFundraisers(paginated = true) {
      return this.$store.dispatch('FETCH_TOP_FUNDRAISERS', { paginated })
        .then(data => data)
        .catch(err => err);
    },
    closeDonation() {
      this.$router.push({ name: 'nonprofit', params: this.$route.params });
    },
    enableEdition() {
      if (!this.loggedIn) {
        this.showLoginModal = true;
      } else {
        this.showLoginModal = false;
        // determine if the nonprofit is in the list
        if (this.canManageThisNonprofit) {
          this.enableEditionForThisNonprofit = true;
        } else {
          this.showClaimNonprofitModal = true;
        }
      }
    },
    closeEdition() {
      this.enableEditionForThisNonprofit = false;
    },
  },
  watch: {
    /**
     * As the view will be reused even if the ein param changes, we need to watch it
     * and fetch again the data for the other sections.
     */
    ein(ein) {
      //this.loadFundraisers();
      this.loadMoreDonations();
      this.loadMoreTopFundraisers();
      this.loadNonprofitData();
    },
  },
};
</script>

<style scoped lang="scss">
.fundraiser_cta {
  margin: 50px auto;
  border-radius: 10px;
  display: flex;
  font-size: 18px;
  @include tablet {
    font-size: 24px;
    width: 40%;
    max-width: 450px;
  }
}

.nonprofit-intro {
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 1.5;

  @include tablet {
    padding: 0 70px;
  }

  &__manage-cta {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      font-size: 1.1rem;
    }
  }
}

.nonprofit-info {
  margin-top: 20px;
  
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

<style lang='scss'>
.nonprofit-extended {
  .helper-text {
    padding-top: .125em !important;
    padding-bottom: .25em;
  }
}
</style>
