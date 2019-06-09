<template>
  <div 
    class="nonprofit-register-step-two"
    id='nonprofit-register-step-two'
  >
    <div class="container nonprofit-register__container nonprofit-register__container--small">
      <h2 class='has-text-weight-bold nonprofit-register__heading'>Results for: {{ filterValue }}</h2>    
      <nonprofit-register-results />
      <div class="nonprofit-register-step-two__search">
        <h2 class='has-text-weight-bold nonprofit-register__heading'><span class="has-text-weight-bold">Try another search:</span></h2>
        <nonprofit-directory-search-form 
          @formSubmit='onFormSubmit'
          :show-reset-button='false'
          :input-placeholder='"Enter 1-2 keywords from your nonprofit name"'
        />
      </div>
      <div class="nonprofit-register-step-two__btn-container">
        <button 
          class='button is-primary'
          @click='goToStepThree'
        >
          Add A New Nonprofit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import NonprofitDirectorySearchForm from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearchForm'
import NonprofitRegisterResults from 'LocalComponents/Nonprofit/Register/NonprofitRegisterResults'

export default {
  name: 'NonprofitRegisterStepTwo',

  components: {
    NonprofitDirectorySearchForm,
    NonprofitRegisterResults,
  },

  computed: {
    ...mapState({
      filterValue: state => state.nonprofitRegistration.filter,
    })
  },

  methods: {
    onFormReset() {
      this.setFilter('')
    },

    goToStepThree() {
      this.$router.push({name: 'nonprofit-sign-up-step-three'})      
    },

    onFormSubmit (filterValue) {
      this.setFilter(filterValue)
    },

    ...mapMutations({
      setFilter: 'nonprofitRegistration/setFilter',
    })
  },
}
</script>

<style lang="scss">
.nonprofit-register-step-two {
  .nonprofit-register__heading {
    margin-bottom: 1rem;
  }

  &__btn-container {
    margin-top: 1.5em;

    .button {
      font-size: 1.25em;
    }
  }

  &__search {
    margin-top: 2em;
    .nonprofit-register__heading {
      color: $primary;
      font-size: 22px;
    }
  }

  .subheading {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }

  .search-subheading {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
}
</style>
