<template>
  <div 
    class="nonprofit-directory-list-by-name"
  >
    <div 
      class="nonprofit-directory-list-by-name__wrapper"
      v-if='nonprofitsSorted.length > 0'
    >
      <p class='subheading' v-if='showSubheading'>If your nonprofit is below, click "Claim this nonprofit." If it's already claimed, check to see if others in your group claimed it. If they didn’t, contact us <a href="#">here</a>. If it's not in the results, the current profile on our site may have a typo, so please do a 2nd search using other words. If you've already done that, click “Add A New Nonprofit” at the bottom.</p>
      <div 
        class="nonprofit-directory-list-by-name__item"
        v-for='(nonprofit, index) in nonprofitsSorted'
        :key='index'
      >
        <div class="nonprofit-directory-list-by-name__heading-row">
          <div class="nonprofit-directory-list-by-name__name-wrapper">
            <p class='nonprofit-directory-list-by-name__name' v-if='addLinkToHeadings'>
              <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }">{{ nonprofit.name }}</router-link>
            </p>
            <p class='nonprofit-directory-list-by-name__name' v-else>
              {{ nonprofit.name }}
            </p>
          </div>
          <div class="nonprofit-directory-list-by-name__actions">
            <button
              class='button is-secondary nonprofit-directory-list-by-name__action nonprofit-directory-list-by-name__action--claim'
              :disabled='nonprofit.claimed'     
              v-if='showClaimNonprofitButton'   
            >
              {{ nonprofit.claimed ? 'Already claimed' : 'Claim this nonprofit' }}
            </button>
            <router-link
              :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }"
              class='button is-primary nonprofit-directory-list-by-name__action'
            >
              View Profile
            </router-link>
            <button class='nonprofit-directory-list-by-name__action is-secondary is-small button' v-if='showDonateButton'>Donate</button>
            <router-link :to='`/nonprofit/${nonprofit.id}`' class='nonprofit-directory-list-by-name__link' v-if='showLocationsButton'>See all locations</router-link>
          </div>
        </div>
        <div class="nonprofit-directory-list-by-name__countries-row">
            <p>Countries include: {{ splitCountries(nonprofit.locations) }}</p>
        </div>
      </div>
    </div>
    <div
      class='nonprofit-directory-list-by-name__wrapper nonprofit-directory-list-by-name__wrapper--empty'
      v-else
    >
      <img src="@/assets/img/no-results.png" alt="No Results">
      <p class='results-text'>0 results found.</p>
      <p class='' v-if='!$slots.errorMessage'>It's possible that the current profile on our site has a typo, so please do a 2nd search using other words from your name. If you've already done that, add a new nonprofit below.</p>
      <div class="nonprofit-directory-list__empty-message">
        <slot name='errorMessage'></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { orderBy } from 'lodash'

export default {
  name: 'NonprofitDirectoryListByName',

  props: {
    showSubheading: {
      type: Boolean,
      required: false,
      default: true,
    },

    filter: {
      type: String,
      required: false,
      default: '',
    },

    showClaimNonprofitButton: {
      type: Boolean,
      required: false,
      default: false,
    },

    showDonateButton: {
      type: Boolean,
      required: false,
      default: true,
    },

    showLocationsButton: {
      type: Boolean,
      required: false,
      default: true,
    },

    addLinkToHeadings: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    splitCountries (countries = []) {
      return countries.join(', ')
    }
  },

  computed: {
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
.nonprofit-directory-list-by-name {
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
      min-height: 386px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;

      > img {
        max-width: 140px;
        // width: 100%;
        margin-bottom: 1.25em;
      }

      p {
        margin-bottom: 10px;
        max-width: 730px;
        font-size: 1.125em;
      }

      .results-text {
        font-size: 1.375rem;
      }
    }
  }

  &__item {
    margin-bottom: 1em;

    &:first-of-type {
      padding-top: .5em;
    }
    
    &:last-child {
      margin-bottom: 0;
      padding-bottom: .5em;
    }
  }

  &__actions {
    margin-top: .5em;
    display: flex;
    align-items: center;

    @include tablet {
      margin-top: 0;
      margin-left: .375rem;
    }
  }

  &__heading-row {
    display: flex;
    flex-direction: column;

    @include tablet {
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    p {
      margin-bottom: 0;
    }
  }

  &__countries-row {
    margin-top: .5em;
    text-align: left;

    @include tablet {
      margin-left: 2em;
    }
  }

  &__name-wrapper {
    margin-right: 20px;

    @include tablet {
      min-width: 350px;
      max-width: 350px;
    }

    @include desktop {
      min-width: 500px;
      max-width: 500px;
    }
  }

  &__name {
    font-size: 1.375em;
    font-weight: 700;
  }

  &__action {
    font-size: .875em;
    height: auto;
    padding: .125em .5em!important;
    margin-right: .5rem;
    border-radius: 4px;

    @include tablet {
      margin-right: 1.25rem;
    }

    &--claim {
      width: 153px;
    }
  }

  &__link {
    text-decoration: underline;
    font-size: 17px;
  }
}
</style>
