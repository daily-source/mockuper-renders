<template>
  <div class='nonprofit-directory-list'>
    <!-- TODO: Maybe make this is a separate component -->
    <div 
      class="nonprofit-directory-search"
      v-if='showSearch'
    >
      <nonprofit-directory-search-form 
        @formSubmit='filterNonprofits'
        @formReset='resetFilter'
      />
      <span 
        class='suggest-nonprofit-text'
        v-if='enableNonprofitSuggest'
      >
        To suggest a nonprofit that is not in the list, click <router-link to='/nonprofit-sign-up' target='_blank'>here</router-link>.
      </span>
    </div>
    <div 
      class="nonprofit-directory-list__title"
      v-if='$slots.title'
    >
      <slot name='title'></slot>
    </div>
    
    <div class="nonprofit-list__wrapper">
      <div 
        class='nonprofit-list'
        v-for='(np, index) in nonprofitsPerCountry'
        :key='index'
      >
        <h4 class='has-text-weight-bold nonprofit-list__country'>{{np.country}}</h4>
        <div 
          class='nonprofit-list__countries nonprofit-list__block--indented'
          v-if='np.nonprofits && np.country !== "USA"'
        >
          <nonprofit-directory-list-item 
            v-for='nonprofit in np.nonprofits'
            :key='nonprofit.id'
            :nonprofit='nonprofit'
            :show-claim-nonprofit-button='showClaimNonprofitButton'
            :show-donate-button='listItemOptions.showDonateButton'
            :show-locations-button='listItemOptions.showLocationsButton'
          />
        </div>
        <div 
          class='nonprofit-list__cities'
          v-if='np.country === "USA" && np.nonprofits.length > 0'
        >
          <div 
            class='nonprofit-list__block--indented nonprofit-list-city'
            v-for='(nonprofit, index) in np.nonprofits'
            :key='index'
          >
            <h4 class='has-text-weight-bold nonprofit-list-city__label'>{{ nonprofit.state }}</h4>
            <div 
              class='nonprofit-list__cities-list nonprofit-list__block--indented nonprofit-list__block--indented-level-2'
              v-if='nonprofit.nonprofits'
            >
              <nonprofit-directory-list-item 
                v-for='nonprofit in nonprofit.nonprofits'
                :key='nonprofit.id'
                :nonprofit='nonprofit'
                :show-claim-nonprofit-button='showClaimNonprofitButton'
                :show-donate-button='listItemOptions.showDonateButton'
                :show-locations-button='listItemOptions.showLocationsButton'
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
      class='nonprofit-directory-list--empty'
      v-if='nonprofitsPerCountry.length === 0'
    >
      <img src="@/assets/img/no-results.png" alt="No Results">
      <p class='results-text'>0 results found.</p>
      <p class=''>It's possible the current profile on our site has a typo, so please do a 2nd search using other words from your name. If you've already done that, add a new nonprofit below.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { orderBy } from 'lodash'

import NonprofitDirectorySearch from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearch'
import NonprofitDirectorySearchForm from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearchForm'
import NonprofitDirectoryListItem from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryListItem'
import NonprofitDirectoryFilters from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryFilters'

export default {
  name: 'NonprofitList',

  props: {
    enableNonprofitSuggest: {
      type: Boolean,
      required: false,
      default: true,
    },

    showClaimNonprofitButton: {
      type: Boolean,
      required: false,
      default: false,
    },

    showSearch: {
      type: Boolean,
      required: false,
      default: true,
    },
    
    listItemOptions: {
      type: Object,
      required: false,
      default: () => {
        return {
          showDonateButton: true,
          showLocationsButton: true,
        }
      }
    },

    initialFilter: {
      type: String,
      required: false,
      default: '',
    },
  },

  components: {
    NonprofitDirectorySearchForm,
    NonprofitDirectorySearch,
    NonprofitDirectoryListItem,
    NonprofitDirectoryFilters,
  },

  data () {
    return {
      filterValue: '',
      filter: this.initialFilter,
    }
  },

  methods: {
    /**
     * Filter out the nonprofit according `filterValue` value.
     * 
     * We only filter when the search button is clicked so we store 
     * the filter value temporarily first.
     */
    filterNonprofits (filterValue) {
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

      // Sort countries alphabetically.

      return countriesArray.sort()
    },

    /**
     * Nonprofits per country
     */
    nonprofitsPerCountry () {
      return this.countries.map(country => {
        if (country !== 'USA') {
          const nonprofits = this.nonprofits.filter(nonprofit => {
            const location = nonprofit.locations.filter(location => {
              return location.country === country
            })
  
            return location.length
          })
  
          return {
            country,
            nonprofits,
          }
        } else {
          let states = []

          const nonprofits = this.nonprofits.filter(nonprofit => {
            const location = nonprofit.locations.filter(location => {
              return location.country === 'USA'
            })
  
            return location.length
          }).map(nonprofit => {
            const locations = nonprofit.locations.filter(({ country }) => country === 'USA')

            return {
              ...nonprofit,
              locations
            }
          })

          nonprofits.map(({ locations }) => {
            locations.map(({country, state}) => {
              const isCityExisting = states.find(rec => rec === state)

              if (!isCityExisting) {
                states.push(state)
              }
            })
          })

          const nonprofitsPerState = states.map(state  => {
            const nps = nonprofits.filter(nonprofit => {
              const location = nonprofit.locations.filter(location => {
                if (location.state) {
                  return location.state === state
                }

                return false
              })

              return location.length
            })

            return {
              state: state,
              nonprofits: nps,
            }
          })

          return {
            country,
            nonprofits: nonprofitsPerState,
          }
        }
      })
    },

    /**
     * Unique cities per country based on the nonprofit locations
     */
    citiesPerCountry () {
      return this.countries.map(countryRec => {
        let cities = []

        this.nonprofits.map(({ locations }) => {
          
          if (countryRec === 'USA') {
            locations.map(({country, state}) => {
              const isCityExisting = cities.find(rec => rec === state)

              if (!isCityExisting && country === countryRec) {
                cities.push(state)
              }
            })
          } else {
            locations.map(({country, city}) => {
              const isCityExisting = cities.find(rec => rec === city)

              if (!isCityExisting && country === countryRec) {
                cities.push(city)
              }
            })
          }
        })

        cities = cities.sort()

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
        let nonprofits = this.nonprofits.filter(nonprofit => {
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
              if (country === 'USA') {
                if (location.state) {
                  return location.state === city
                }
              } else {
                if (location.city) {
                  return location.city === city
                }
              }

              return false
            })

            return location.length
          })

          return {
            city: city,
            nonprofits: nonprofits,
          }
        })

        nonprofits = orderBy(nonprofits, [nonprofit => nonprofit.name.toLowerCase()], 'desc')

        return {
          country: country,
          nonprofits,
          cities: nonprofitsCities,
        }
      })
    },

    ...mapState({
      nonprofits (state) {
        const filterBasis = this.showState ? this.filter : this.initialFilter

        if (filterBasis) {
          return state.nonprofits.data.filter(nonprofit => {
            // Remove special characters for better filtering.
            const name = nonprofit.name.toLowerCase().replace(/[^\w\s]/gi, '')
            const filter = filterBasis.toLowerCase().replace(/[^\w\s]/gi, '')

            return name.includes(filter)
          })
        }

        return state.nonprofits.data
      },
    })
  }
}
</script>

<style lang='scss' scoped>
.nonprofit-directory-list {
  margin-top: 2em;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;

  &--empty {
    max-width: 100%;
    text-align: center;

    img {
      margin-bottom: 1em;
    }

    p {
      margin-bottom: 10px;
      max-width: 730px;
    }

    .results-text {
      font-size: 1.25em;
    }
  }
}

.nonprofit-list {
  margin-bottom: 2em;
  &__block {
    &--indented {
      margin-left: 3em;
    }

    &--indented-level-2 {
      margin-left: 1.5em;
      
      .nonprofit-directory-list-item__name {
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

  &__filters {
    margin-bottom: 1.875em;
  }
}

.nonprofit-list-city {
  margin-bottom: 1em;
  margin-left: 1.5em;

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
      .nonprofit-directory-list-item__name {
        max-width: 300px;
        min-width: 300px;
      }
    }
  }
}
</style>
