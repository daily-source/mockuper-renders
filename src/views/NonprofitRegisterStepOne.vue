<template>
  <div class="nonprofit-register-form-step">
    <div class="container nonprofit-register__container nonprofit-register__container--small">
      <h2 class='has-text-weight-bold'>Add your nonprofit</h2>
      <p>Most nonprofits are already in our directory. It will confuse visitors if you have two different profiles because they will be unsure which is the right one. Thus they will be less likely to pick you to donate to and add to their profile. Also, when we eventually discover you have two profiles, we will have to delete one and you will lose all the people who have connected to the deleted profile. To prevent that, search our directory to see if you’re already in it. If yes, you can claim the profile. If not, then you can add a new nonprofit.</p>
      <p>In the field below, search for one or two of the most unique words of your nonprofit to get a list of matching results. If it doesn’t show up in those results, there is a small chance your current profile has a typo. Thus, do a second search using other words from your name.</p>
      <nonprofit-directory-search-form 
        @formSubmit='onFormSubmit'
        :input-placeholder='"Enter 1-2 keywords from your nonprofit name"'
        id='nonprofit-directory-search-form'
      />
      <nonprofit-directory-list 
        :enable-nonprofit-suggest='false'
        :show-claim-nonprofit-button='true'
        :show-search='false'
        class='nonprofit-register__directory'
      >
        <h3 slot='title' class='has-text-weight-bold nonprofit-register__heading'>Nonprofit Directory</h3>
      </nonprofit-directory-list>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import NonprofitDirectorySearchForm from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearchForm'
import NonprofitDirectoryList from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryList'

export default {
  name: 'NonprofitRegisterStepOne',

  components: {
    NonprofitDirectorySearchForm,
    NonprofitDirectoryList,
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
  }
}
</script>
