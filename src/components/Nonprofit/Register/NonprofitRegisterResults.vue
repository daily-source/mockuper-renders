<template>
  <div 
    class="nonprofit-register-results"
  >
    <div 
      class="nonprofit-register-results__wrapper"
      v-if='nonprofitsSorted.length > 0'
    >
      <p class='subheading' v-if='showSubheading'>If your nonprofit is below, click "Claim this nonprofit." If it's already claimed, check to see if others in your group claimed it. If they didn’t, contact us <a href="#">here</a>. If it's not in the results, the current profile on our site may have a typo, so please do a 2nd search using other words. If you've already done that, click “Add A New Nonprofit” at the bottom.</p>
      <div 
        class="nonprofit-register-results__item"
        v-for='(nonprofit, index) in nonprofitsSorted'
        :key='index'
      >
        <div class="nonprofit-register-results__heading-row">
          <div class="nonprofit-register-results__name-wrapper">
            <p class='nonprofit-register-results__name'>{{ nonprofit.name }}</p>
          </div>
          <div class="nonprofit-register-results__actions">
            <button
              class='button is-secondary nonprofit-register-results__action nonprofit-register-results__action--claim'
              :disabled='nonprofit.claimed'        
            >
              {{ nonprofit.claimed ? 'Already claimed' : 'Claim this nonprofit' }}
            </button>
            <button
              class='button is-primary nonprofit-register-results__action'
            >
              View Profile
            </button>
          </div>
        </div>
        <div class="nonprofit-register-results__countries-row">
            <p>Countries include: {{ splitCountries(nonprofit.locations) }}</p>
        </div>
      </div>
    </div>
    <div
      class='nonprofit-register-results__wrapper nonprofit-register-results__wrapper--empty'
      v-else
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

export default {
  name: 'NonprofitRegisterResults',

  props: {
    showSubheading: {
      type: Boolean,
      required: false,
      default: true,
    }
  },

  methods: {
    splitCountries (countries = []) {
      return countries.join(', ')
    }
  },

  computed: {
    ...mapState({
      filterBasis: state => state.nonprofitRegistration.filter,

      nonprofits (state) {
        if (this.filterBasis) {
          return state.nonprofits.data.filter(nonprofit => {
            // Remove special characters for better filtering.
            const name = nonprofit.name.toLowerCase().replace(/[^\w\s]/gi, '')
            const filter = this.filterBasis.toLowerCase().replace(/[^\w\s]/gi, '')

            return name.includes(filter)
          })
        }

        return state.nonprofits.data
      },

      nonprofitsSorted () {
        const nonprofits =  this.nonprofits.map(np => {
          let locations = []

          np.locations.forEach(loc => {
            if (locations.indexOf(loc.country) === -1) {
              locations.push(loc.country)
            }
          })

          return {
            ...np,
            locations,
          }
        })

        return orderBy(nonprofits, [nonprofit => nonprofit.name.toLowerCase()], ['ASC'])
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-register-results {
  $self: &;
  margin-top: 1.25em;
  margin-bottom: 1.25em;

  .subheading {
    a {
      color: $blue;
    }
  }

  &__wrapper {
    max-width: 100%;

    &--empty {
      min-height: 400px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      > img {
        max-width: 170px;
        width: 100%;
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

  &__item {
    margin-bottom: 1em;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__heading-row {
    display: flex;
    align-items: center;

    p {
      margin-bottom: 0;
    }
  }

  &__countries-row {
    margin-top: .5em;
    margin-left: 2em;
    text-align: left;
  }

  &__name-wrapper {
    margin-right: 20px;
    min-width: 500px;
    max-width: 500px;
  }

  &__name {
    font-size: 1.375em;
    font-weight: 700;
  }

  &__action {
    font-size: .875em;
    height: auto;
    padding: .125em .5em!important;
    margin-right: 1.25rem;

    &--claim {
      min-width: 153px;
    }
  }
}
</style>
