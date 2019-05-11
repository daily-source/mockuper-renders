<template>
  <div class="fundraiser">
    <app-header 
      layout="app"
      volunteer-text='Do one now'  
    />
    <transition name="slide-fade">
      <DonateView
        v-if="donateActive"
        parent="fundraiser"
        v-on:close="closeDonation()"
      ></DonateView>
    </transition>
    <FundraiserHeader
      :fundraiser="fundraiser"
      :editing="enableEditionForThisFundraiser"
      v-on:edit:close="closeEdition()"
    ></FundraiserHeader>
    <FundraiserHero
      :fundraiser="fundraiser"
      :key="donateActive"
      :can-edit="canManageThisFundraiser"
      :editing="enableEditionForThisFundraiser"
      v-on:edit:open="enableEdition()"
    >
      <p slot="copytext">
        {{fundraiser.User.firstName}} will lose {{fundraiser.fundraiserDetails.hours}} pounds {{fundraiser.communityWork}} for <router-link :to="`/nonprofit/${fundraiser.Nonprofit.EIN}`"> {{ fundraiser.Nonprofit.NAME }}</router-link>. In addition to your donations, she will donate ${{ fundraiser.fundraiserDetails.ownMoneyAmount }} plus the ${{ fundraiser.fundraiserDetails.foodAmount }} in food.
      </p>
      <span slot="effortstext">Please sponsor {{fundraiser.User.firstName}}'s FUNDRAISER NAME</span>
    </FundraiserHero>
    <FundraiserParticipant
      id="FundraiserParticipant"
      ref="FundraiserParticipant"
      :fundraiser="fundraiser"
      :editing="enableEditionForThisFundraiser"
      :can-edit="canManageThisFundraiser"
    ></FundraiserParticipant>
    <FundraiserLowerBody
      id="FundraiserLowerBody"
      :fundraiser="fundraiser"
      :key="donateModal"
      :can-edit="canManageThisFundraiser"
      :editing="enableEditionForThisFundraiser"
    ></FundraiserLowerBody>

    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMeta from 'vue-meta';
import AppHeader from 'Components/Loseathon/AppHeader.vue';
import FundraiserHeader from 'Components/fundraiser/FundraiserHeader.vue';

Vue.use(VueMeta);

export default {
  name: 'fundraiser',
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppHeader,
    SharedFooter: () => import('Components/Shared/SharedFooter.vue'),
    FundraiserHeader,
    FundraiserHero: () => import('Components/fundraiser/FundraiserHero.vue'),
    FundraiserParticipant: () => import('Components/fundraiser/FundraiserParticipant.vue'),
    FundraiserLowerBody: () => import('LocalComponents/fundraiser/FundraiserLowerBody.vue'),
    DonateView: () => import('./DonateView.vue'),
  },
  data() {
    return {
      enableEditionForThisFundraiser: false,
      canRender: false,
    };
  },
  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo() {
    if (!this.fundraiser.participant) {
      return {};
    }
    const description = `Support ${this.fundraiser.participant.name}'s volunteerathon: ${this.fundraiser.name} for the nonprofit ${this.fundraiser.Nonprofit.name}`;
    const title = this.fundraiser.name;
    const img = `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}${this.fundraiser.data.media[0].src}`;
    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', property: 'og:description', content: description },
        { vmid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
        { vmid: 'og:image', property: 'og:image', content: img },
        { vmid: 'og:image:width', property: 'og:image:width', content: '800' },
        { vmid: 'og:image:height', property: 'og:image:height', content: '533' },
      ],
    };
  },
  computed: {
    fundraiser() {
      return this.$store.state.fundraiser;
    },
    donateModal() {
      return this.$route.name;
    },
    donateActive() {
      return this.donateModal === 'fundraiser/donate';
    },
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    canManageThisFundraiser() {
      return false;
    },
  },

  /**
   * If this is a donation view, redirect to the corresponding fundraiser on close event.
   */
  methods: {
    closeDonation() {
      this.$router.push({ name: 'fundraiser', params: this.$route.params });
    },
    enableEdition(ref) {
      if (!this.loggedIn) {
        this.showLoginModal = true;
      } else {
        this.showLoginModal = false;
        // determine if the user manages this fundraiser
        if (this.canManageThisFundraiser) {
          this.enableEditionForThisFundraiser = true;
          if (ref) {
            setTimeout(() => {
              this.$scrollTo(`#${ref}`, { offset: -200 });
            }, 1000);
          }
        }
      }
    },
    closeEdition() {
      this.enableEditionForThisFundraiser = false;
      this.$refs.FundraiserParticipant.$refs.imageEditor.cancelEdition();
      // this.$scrollTo("body", { offset: -200 })
    },
  },
};
</script>

<style lang="scss">
.fundraiser {
  background-color: $color-fundraiser-bg;

  @include tablet {
    background-color: $color-fundraiser-bg;
  }

  .is-fluid.white-bg {
    background-color: $white;

    @include tablet {
      padding: 0 50px 20px;
    }
  }
}

</style>
