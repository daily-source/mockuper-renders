<template>
  <div class="nonprofit-irs-profile">
    <app-header />
    <intro-video />    
    <section class='section nonprofit-irs-profile__section'>
      <div 
        class="nonprofit-irs-profile__loader"
        v-show='!nonprofit'
      >
        <loader 
          :width='50'
          :height='50'
          color='#dedede'
          message='Fetching nonprofit details.'
        />
      </div>
      <div 
        class="nonprofits-irs-profile__details"
        v-if='nonprofit'
      >
        <div class="nonprofit-irs-profile__container container">
          <p class='nonprofit-irs-profile__alert' v-if='showAlert'>
            Below is the information for the nonprofit you selected. If it matches your nonprofit, click here to <router-link :to='{ name: "nonprofit-irs", params: { "ein": this.nonprofit.EIN }, query: {claim: true }}'>continue</router-link>. If it’s not the right nonprofit, click <router-link :to='{ name: "nonprofit-sign-up-step-three" }'>here</router-link> to return to the search page.
          </p>

          <nonprofit-irs-data 
            :nonprofit='nonprofit'
            v-if='nonprofit && !claim'
          />
          <div 
            class="nonprofit-irs-profile__container container" 
            v-if='nonprofit && claim'
          >
            <div class="nonprofit-irs-profile__form">
              <nonprofit-claim-form 
                :nonprofit='nonprofit'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import NonprofitIrsData from 'Components/nonprofit/NonprofitIRSData'
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import SharedFooter from 'Components/Shared/SharedFooter'
import NonprofitIrsDetails from 'LocalComponents/Nonprofit/NonprofitIRSDetails'
import NonprofitRegisterNonIrsFormFields from 'LocalComponents/Nonprofit/Register/NonprofitRegisterNonIRSFormFields'
import NonprofitRegisterMailingFormFields from 'LocalComponents/Nonprofit/Register/NonprofitRegisterMailingFormFields'
import NonprofitClaimForm from 'Components/nonprofit/NonprofitClaimForm'
import Loader from 'Components/Shared/Loader'
import Alert from 'LocalComponents/Alert/Alert'

const IRSSearchAPI = process.env.VUE_APP_IRS_SEARCH_API_URL || process.env.IRS_SEARCH_API_URL

export default {
  name: 'NonprofitIRSProfile',

  components: {
    AppHeader,
    IntroVideo,
    SharedFooter,
    NonprofitIrsDetails,
    NonprofitRegisterNonIrsFormFields,
    NonprofitRegisterMailingFormFields,
    Loader,
    Alert,
    NonprofitIrsData,
    NonprofitClaimForm,
  },

  data () {
    return {
      nonprofit: null,
      alertOpened: true,
    }
  },

  mounted () {
    this.fetchNonprofitProfile()
  },

  methods: {
    async fetchNonprofitProfile (ein) {
      const res = await fetch(`${IRSSearchAPI}/nonprofits/${this.ein}`)
      
      const resJson = await res.json()

      this.nonprofit = {
        data: {
          name: resJson[0].NAME
        },
        ...resJson[0],
        NTEE_CD: resJson[0].NTEE_CD && resJson[0].NTEE_CD !== '0' ? resJson[0].NTEE_CD : '-',
        ACTIVITY: resJson[0].ACTIVITY && resJson[0].ACTIVITY !== '0' ? resJson[0].ACTIVITY : '-',
      }
    },

    onFormSubmit () {
      this.$router.push({ name: 'nonprofit-sign-up-step-four' })
    },
  },

  computed: {
    ein () {
      return this.$route.params.ein
    },

    claim () {
      return this.$route.query.claim
    },

    showAlert () {
      return this.$route.query.showAlert
    }
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `${this.nonprofit ? this.nonprofit.NAME : 'Nonprofit Profile' } | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-irs-profile {
  &__section {
    position: relative;
    min-height: 300px;
  }

  &__form {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  &__loader {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
      margin-top: .5em;
    }
  }

  &__actions-container {
    margin-top: 2em;
    margin-bottom: .5em;
  }

  &__alert {
    margin-bottom: 2em;
    font-size: 1.125em;

    a {
      text-decoration: underline;
      color: $secondary;
    }
  }
}
</style>

<style lang='scss'>
.nonprofit-irs-profile {  
  .nonprofit-register-non-irs-form-fields {
    &__field-label {
      flex-basis: 100px !important;
      max-width: 160px !important;
    }
  }
}

.nonprofit-irs-profile {
  .nonprofit-description__manage-cta {
    display: none;
  }
}

</style>
