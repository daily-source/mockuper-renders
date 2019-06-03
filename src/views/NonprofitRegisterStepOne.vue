<template>
  <div class="nonprofit-register-form-step">
    <div class="container nonprofit-register__container nonprofit-register__container--small">
      <h2 class='has-text-weight-bold'>Add your nonprofit</h2>
      <p>We've already added most anti-slavery nonprofits to our directory. If you add a 2nd profile, people won’t know which is right, and thus will be less likely to pick you to support. And when we someday find you have 2 profiles, we’ll have to delete one, and you’ll lose all data and people connected to it. To prevent that, search to see if your nonprofit is here. If it is, you can claim it. If not, you can add it.</p>

      <p>If your name has more than 3 words, don't search for all of them as it reduces the chance of finding it. Instead, search for 1 or 2 unique words of your nonprofit name. If it doesn’t show up, do a 2nd search using other words as it’s possible your current profile has a typo.</p>
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
