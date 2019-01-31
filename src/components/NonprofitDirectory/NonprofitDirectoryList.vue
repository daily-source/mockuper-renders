<template>
  <div class='nonprofit-directory-list'>
    <!-- TODO: Maybe make this is a separate component -->
    <div class='nonprofit-directory-search'>
      <nonprofit-directory-search 
        v-model='filterValue'
      />
      <button 
        class='button is-primary nonprofit-directory-search__button'
        @click='filterNonprofits'
      >
        Search
      </button>
    </div>
    <div 
      class='nonprofit-list' 
      v-for='(np, index) in nonprofitsSorted'
      :key='index'
    >
      <h4 class='has-text-weight-bold nonprofit-list__country'>{{np.country}}</h4>

      <div 
        class='nonprofit-list__countries nonprofit-list__block--indented'
        v-if='np.nonprofits'
      >
        <nonprofit-directory-list-item 
          v-for='nonprofit in np.nonprofits'
          :key='nonprofit.id'
          :nonprofit='nonprofit'
        />
      </div>
      <div 
        class='nonprofit-list__cities'
        v-if='np.cities && np.cities.length > 0'
      >
        <div 
          class='nonprofit-list__block--indented nonprofist-list-city'
          v-for='(city, index) in np.cities'
          :key='index'
        >
          <h4 class='has-text-weight-bold nonprofit-list-city__label'>{{ city.city }}</h4>
          <div 
            class='nonprofit-list__cities-list nonprofit-list__block--indented'
            v-if='city.nonprofits'
          >
            <nonprofit-directory-list-item 
              v-for='nonprofit in city.nonprofits'
              :key='nonprofit.id'
              :nonprofit='nonprofit'
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NonprofitDirectorySearch from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearch'
import NonprofitDirectoryListItem from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryListItem'

export default {
  name: 'NonprofitList',

  components: {
    NonprofitDirectoryListItem,
    NonprofitDirectorySearch,
  },

  data () {
    return {
      filterValue: '',
      filter: '',
    }
  },

  methods: {
    /**
     * Filter out the nonprofit according `filterValue` value.
     * 
     * We only filter when the search button is clicked so we store 
     * the filter value temporarily first.
     */
    filterNonprofits () {
      this.filter = this.filterValue
    }
  },

  computed: {
    /**
     * Unique countries based on nonprofit locations
     */
    countries () {
      let countriesArray = []

      this.nonprofits.map(nonprofit => {
        nonprofit.locations.map(({ country }) => {
          if (countriesArray.indexOf(country) < 0 ) {
            countriesArray = [
              ...countriesArray,
              country,
            ]
          }
        })
      })

      return countriesArray
    },

    /**
     * Unique cities per country based on the nonprofit locations
     */
    citiesPerCountry () {
      return this.countries.map(countryRec => {
        let cities = []

        this.nonprofits.map(({ locations }) => {
          locations.map(({country, city}) => {
            if (cities.indexOf(cities) === -1 && country === countryRec) {
              cities.push(city)
            }
          })
        })

        return {
          country: countryRec,
          cities,
        }
      })
    },

    /**
     * Sorted nonprofits grouped according to their location
     */
    nonprofitsSorted () {
      return this.citiesPerCountry.map(({ cities, country }) => {
        // Get nonprofits under the country but without a city defined.
        // For example, a nonprofit may have a location with USA defined as a country
        // but without a state defined.
        const nonprofits = this.nonprofits.filter(nonprofit => {
          const location = nonprofit.locations.filter(location => {
            return !location.city && location.country === country
          })

          return location.length
        })

        // Now, we get the nonprofits that is under the country 
        // and is under a certain city, too.
        const nonprofitsCities = cities.map(city => {
          const nonprofits = this.nonprofits.filter(nonprofit => {
            const location = nonprofit.locations.filter(location => {
              return location.city === city
            })

            return location.length
          })

          return {
            city: city,
            nonprofits: nonprofits,
          }
        })

        return {
          country: country,
          nonprofits,
          cities: nonprofitsCities,
        }
      })
    },

    ...mapState({
      nonprofits (state) {
        if (this.filter) {
          return state.nonprofits.data.filter(nonprofit => {
            // Remove special characters for better filtering.
            const name = nonprofit.name.toLowerCase().replace(/[^\w\s]/gi, '')
            const filter = this.filter.toLowerCase().replace(/[^\w\s]/gi, '')

            return name.includes(filter)
          })
        }

        return state.nonprofits.data
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.nonprofit-directory-list {
  margin-top: 2em;
}

.nonprofit-list {
  &__block {
    &--indented {
      margin-left: 1.5em;
    }
  }
}

.nonprofit-list-city {
  &__label {
    font-size: 17px;
    color: #555;
    margin-bottom: 10px;
  }
}

.nonprofit-directory-search {
  max-width: 500px;
  margin-bottom: 2em;
  display: flex;
  align-items: center;

  &__button {
    margin-left: 1em;
  }
}
</style>
 