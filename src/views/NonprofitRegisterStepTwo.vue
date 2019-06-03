<template>
  <div 
    class="nonprofit-register-step-two"
    id='nonprofit-register-step-two'
  >
    <div class="container nonprofit-register__container nonprofit-register__container--small">
      <h2 class='has-text-weight-bold nonprofit-register__heading'>Results</h2>    
      <p class='is-marginless'>If your nonprofit is below, click "Claim this nonprofit." If it's already claimed, check with others to see if someone has claimed it. If not, contact us here. If it's not in the results, the current profile on our site may have a typo, so please do a 2nd search using other words from your name. If you've already done that, add a new nonprofit at the bottom.</p>
      <!-- <nonprofit-directory-list 
        :enable-nonprofit-suggest='false'
        :show-claim-nonprofit-button='true'
        :show-search='false'
        :initial-filter='filterValue'
        class='nonprofit-register__directory'
      /> -->
      <nonprofit-register-results />
      <p v-if='filterValue'><span class="has-text-weight-bold">You searched for: </span>{{ filterValue }}</p>
      <nonprofit-directory-search-form 
        @formSubmit='onFormSubmit'
        :show-reset-button='false'
      />
      <div class="nonprofit-register-step-two__btn-container">
        <button 
          class='button is-primary'
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

    onFormSubmit (filterValue) {
      this.setFilter(filterValue)

      // this.smoothScroll('nonprofit-register-step-two')
    },

    ...mapMutations({
      setFilter: 'nonprofitRegistration/setFilter',
    })
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-register-step-two {
  &__btn-container {
    margin-top: 1.5em;

    .button {
      font-size: 1.25em;
    }
  }
}
</style>
