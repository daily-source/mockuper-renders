<template>
  <div class="nonprofit-directory-with-filter">
    <div class="nonprofit-directory-with-filter__search-wrapper">
      <nonprofit-directory-search-form
        @formSubmit='onFormSubmit'
        @formReset='onFormReset'
        id='nonprofit-directory-search-form'
        class='nonprofit-register-form-with-filter__search-form'
      />
      <span 
        class='suggest-nonprofit-text'
        v-if='showSuggestText'
      >
        To suggest a nonprofit that is not in the list, click <router-link to='/nonprofit-sign-up'>here</router-link>.
      </span>
    </div>
    <div class="nonprofit-directory-with-filter__filters">
      <nonprofit-directory-filters />
    </div>
    <div class="nonprofit-directory-with-filter__nonprofit-list">
      <nonprofit-directory-list
        :enable-nonprofit-suggest='false'
        :show-claim-nonprofit-button='false'
        :show-search='false'
        class='nonprofit-register__directory'
        v-if='sortBy === "country"'
        :filter='filter'
      >
        <p slot='errorMessage'>It's possible the current profile on our site has a typo, so please do another search using other words from your name.</p>
      </nonprofit-directory-list>
      <nonprofit-directory-list-by-name
        :show-subheading='false'
        :filter='filter'
        v-if='sortBy === "name"'
      >
        <p slot='errorMessage'>It's possible the current profile on our site has a typo, so please do another search using other words from your name.</p>
      </nonprofit-directory-list-by-name>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import NonprofitDirectoryFilters from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryFilters'
import NonprofitDirectoryList from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryList'
import NonprofitDirectoryListByName from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryListByName'
import NonprofitDirectorySearchForm from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearchForm'


export default {
  name: 'NonprofitDirectoryWithFilter',

  props: {
    showSuggestText: {
      type: Boolean,
      required: false,
      default: true,
    },

    standalone: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: {
    NonprofitDirectoryFilters,
    NonprofitDirectoryList,
    NonprofitDirectoryListByName,
    NonprofitDirectorySearchForm,
  },

  methods: {
    onFormSubmit (filter) {
      if (!this.standalone) {
        this.setFilterValue(filter)
      }

      this.$emit('search:submit', filter)
    },

    onFormReset (filter) {
      if (!this.standalone) {
        this.resetFilter()
      }

      this.$emit('search:reset')
    },

    ...mapActions({
      setFilterValue: 'nonprofitDirectory/setFilterValue',
      resetFilter: 'nonprofitDirectory/resetFilter'
    })
  },

  computed: {
    ...mapState({
      sortBy: state => state.nonprofitDirectory.sortBy,
      filter: state => state.nonprofitDirectory.filter,
    })
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-directory-with-filter {
  &__search-wrapper {
    margin-bottom: 2em;
    margin-top: 2em;
    display: flex;
    flex-direction: column;

    @include desktop {
      flex-direction: row;
      align-items: center;
    }

    .suggest-nonprofit-text {
      display: inline-block;
      margin-top: .25em;

      @include desktop {
        margin-left: 1.25em;
      }

      a {
        color: $blue;
      }
    }
  }
}
</style>
