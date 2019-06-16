<template>
  <div class='stations-directory-list'>
    <div 
      class="stations-directory-search"
      v-if='showSearch'
    >
      <stations-directory-search-form 
        @formSubmit='filterStations'
        @formReset='resetFilter'
      />
    </div>
    <div class="stations-directory-list__content">
      <stations-directory-list-item 
        v-for='station in stations'
        :key='station.id'
        :station='station'
      />
    </div>
    <div 
      class='stations-directory-list--empty'
      v-if='stations.length === 0'
    >
      <img src="@/assets/img/no-results.png" alt="No Results">
      <p>No stations found. Try another search.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { orderBy } from 'lodash'

import StationsDirectorySearchForm from 'LocalComponents/StationsDirectory/StationsDirectorySearchForm'
import StationsDirectoryListItem from 'LocalComponents/StationsDirectory/StationsDirectoryListItem'

export default {
  name: 'StationsList',

  props: {
    showSearch: {
      type: Boolean,
      required: false,
      default: true,
    },

    initialFilter: {
      type: String,
      required: false,
      default: '',
    },
  },

  components: {
    StationsDirectorySearchForm,
    StationsDirectoryListItem,
  },

  data () {
    return {
      filterValue: '',
      filter: this.initialFilter,
    }
  },

  methods: {
    /**
     * Filter out the stations according `filterValue` value.
     * 
     * We only filter when the search button is clicked so we store 
     * the filter value temporarily first.
     */
    filterStations (filterValue) {
      this.filter = filterValue
    },

    /**
     * Resets the filter value
     */
    resetFilter () {
      this.filter = ''
    },
  },

  computed: {
    ...mapState({
      stations (state) {
        if (this.filter) {
          return state.stations.data.filter(state => {
            // Remove special characters for better filtering.
            const name = state.name.toLowerCase().replace(/[^\w\s]/gi, '')
            const filter = this.filter.toLowerCase().replace(/[^\w\s]/gi, '')

            return name.includes(filter)
          })
        }

        return state.stations.data
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.stations-directory-list {
  margin-top: 1em;

  &--empty {
    margin-top: 2em;
    margin-bottom: 2em;
    min-height: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    p {
      margin-top: 1em;
      font-size: 1.25em;
    }
  }
}

.nonprofit-list {
  margin-bottom: 2em;
  &__block {
    &--indented {
      margin-left: 1.5em;
    }

    &--indented-level-2 {
      .stations-directory-list-item__name {
        max-width: calc(300px - 1.5em);
        min-width: calc(300px - 1.5em);
      }
    }
  }

  &__country {
    font-size: 25px;
    margin-bottom: 12px;
  }

  &__city {
    font-size: 20px;
  }
}

.nonprofit-list-city {
  margin-bottom: 1em;

  &__label {
    font-size: 19px;
    color: #555;
    margin-bottom: 10px;
  }
}

.nonprofit-directory-search {
  margin-bottom: 2em;
  display: flex;
  align-items: center;

  > form {
    display: flex;
    align-items: center;
  }

  &__button {
    margin-left: 1em;
  }

  &__input {
    flex-basis: 350px;
    width: 350px;
    flex-grow: 1;
    max-width: 350px;
  }

  .suggest-nonprofit-text {
    display: inline-block;
    margin-left: 1.25em;
  }
}
</style>

<style lang='scss'>
.nonprofit-list {
  &__block {
    &--indented-level-2 {
      .stations-directory-list-item__name {
        max-width: calc(300px - 1.5em);
        min-width: calc(300px - 1.5em);
      }
    }
  }
}
</style>
