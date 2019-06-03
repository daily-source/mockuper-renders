<template>
  <div 
    class="nonprofit-register-results"
  >
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
            class='button is-secondary nonprofit-register-results__action'
            :disabled='nonprofit.claimed'        
          >
            Claim this nonprofit
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
</template>

<script>
import { mapState } from 'vuex'
import { orderBy } from 'lodash'

export default {
  name: 'NonprofitRegisterResults',

  methods: {
    splitCountries (countries = []) {
      return countries.join(', ')
    }
  },

  computed: {
    ...mapState({
      filter: 'nonprofitRegistration/filter',

      nonprofits (state) {
        if (this.filter) {
          return state.nonprofits.data.filter(nonprofit => {
            // Remove special characters for better filtering.
            const name = nonprofit.name.toLowerCase().replace(/[^\w\s]/gi, '')
            const filter = filterBasis.toLowerCase().replace(/[^\w\s]/gi, '')

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
  margin-top: 1.25em;
  margin-bottom: 1.25em;

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
  }

  &__name-wrapper {
    margin-right: 170px;
  }

  &__name {
    font-size: 1.375em;
    min-width: 310px;
  }

  &__action {
    font-size: .875em;
    height: auto;
    padding: .125em .5em!important;
    margin-right: .5em;
  }
}
</style>
