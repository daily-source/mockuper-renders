<template>
  <div class="nonprofit-register-form-step nonprofit-register-form-step-one">
    <div class="container nonprofit-register__container nonprofit-register__container--small">
      <h2 class='has-text-weight-bold'>Add your nonprofit</h2>
      <p class='subheading'>We’ve added most anti-slavery nonprofits to our site already. If you add a 2nd profile, people won’t know which is right, so they will be less likely to pick you to support. Also, when we someday find you have two profiles, we’ll have to delete one. You’ll lose all data and people connected to it.</p>

      <p class='subheading'>To prevent that, search to see if your nonprofit is here. If it is, you can claim it. If not, you can add it. The screen for adding a new nonprofit shows up after you’ve done one search. If your name has more than 3 words, don't search for all of them as it reduces the chance of finding it. Instead, search for 1 or 2 unique words of your nonprofit name.</p>
      <nonprofit-directory-search-form
        @formSubmit='onFormSubmit'
        :input-placeholder='"Enter 1-2 keywords from your nonprofit name"'
        id='nonprofit-directory-search-form'
        class='nonprofit-register-form-step-one__search-form'
      />
      <div class="nonprofit-register-form-step-one__nonprofit-list">
        <h3 class='has-text-weight-bold nonprofit-register__heading'>Nonprofit Directory</h3>
        <div class="nonprofit-register-form-step-one__nonprofit-filters">
          <nonprofit-directory-filters />
        </div>
        <nonprofit-directory-list
          :enable-nonprofit-suggest='false'
          :show-claim-nonprofit-button='true'
          :show-search='false'
          class='nonprofit-register__directory'
          :list-item-options='{
            showDonateButton: false,
            showLocationsButton: false,
          }'
          v-if='sortBy === "country"'
        />
        <nonprofit-register-results
          :show-subheading='false'
          v-if='sortBy === "name"'
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import NonprofitDirectorySearchForm from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearchForm'
import NonprofitDirectoryList from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryList'
import NonprofitDirectoryFilters from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryFilters'
import NonprofitRegisterResults from 'LocalComponents/Nonprofit/Register/NonprofitRegisterResults'

export default {
  name: 'NonprofitRegisterStepOne',

  components: {
    NonprofitDirectorySearchForm,
    NonprofitDirectoryList,
    NonprofitDirectoryFilters,
    NonprofitRegisterResults,
  },

  data () {
    return {
      filterValue: '',
    }
  },

  methods: {
    onFormSubmit (filterValue) {
      this.filterValue = filterValue

      this.setFilter(this.filterValue)

      this.$router.push({name: 'nonprofit-sign-up-step-two'})
    },

    onFormReset (reset = true) {
      this.filterValue = ''
    },

    ...mapMutations({
      setFilter: 'nonprofitRegistration/setFilter'
    })
  },

  computed: {
    ...mapState({
      sortBy: state => state.nonprofitDirectory.sortBy
    })
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-register-form-step-one {
  &__nonprofit-list {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  &__nonprofit-filters {
    margin-bottom: 1.875em;
  }

  &__search-form {
    padding-top: .25rem;
    padding-bottom: .25rem;
  }
}
</style>

<style lang='scss'>
.nonprofit-register-form-step-one {
  .nonprofit-directory-list-item__name {
    max-width: 457px;
    min-width: 457px;
  }

  .subheading {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
}
</style>
