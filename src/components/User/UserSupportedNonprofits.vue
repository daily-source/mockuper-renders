<template>
	<div class='user-nonprofits'>
		<div class='user-nonprofits__nonprofits-list-wrapper'>
			<ul class='user-nonprofits-list'>
				<li 
					class='user-nonprofits-list__item-wrapper'
					v-for='(nonprofit) in nonprofits'
					:key='nonprofit.id'
				>
          <div class="user-nonprofits-list__item">
            <a :href='nonprofit.url'>{{ nonprofit.name }}</a>
            <div 
              class="user-nonprofits-list__actions"
              v-if='editMode'
            >
              <button class='button is-small is-primary' @click='onEditClicked(nonprofit.id)'>Edit</button>
              <button class='button is-small is-danger' @click='onDeleteClicked(nonprofit.id)'>Delete</button>
            </div>
          </div>
          <div 
            class="user-nonprofits-list__locations" 
            v-if='editLocationsId === nonprofit.id'
          >
            <div 
              class="user-nonprofits-list__locations-list"
              v-if='nonprofit.locations.length > 1'
            >
              <div 
                class="user-nonprofits-list__locations-item"
                v-for='(location, index) in nonprofit.locations'
                :key='index'
              >
                <label class='checkbox'>
                  <input 
                    type='checkbox'
                    @change='(event) => setUserLocation(event.target.checked, nonprofit.id, location.id)'
                    :key='`checkbox-${nonprofit.id}-${location.index}`'
                    :checked='checkIfUserHasLocation(nonprofit.id, location.id)'
                  >
                  {{ location.location }}
                </label>
              </div>
              <div class="user-nonprofits-list__locations-item-actions">
                <button 
                  class='button is-secondary is-small'
                  @click.prevent.stop='saveLocations(nonprofit.id)'
                >
                  Save Changes
                </button>
                <button class='button is-danger is-small' @click.prevent.stop='closeEditLocations(nonprofit.id)'>Cancel</button>
              </div>
            </div>
            <div 
              class="user-nonprofits-list__has-one-location"
              v-if='nonprofit.locations.length === 1'
            >
              <alert
                class='user-nonprofits-list__has-one-location-alert'
                :open='alertOpened'
                @closeButtonClicked='alertOpened = false'
              >
                <p class='user-nonprofit-lists__has-one-location-alert-text is-marginless'>This nonprofit only has one location, so there is nothing to edit.</p>
              </alert>
            </div>
          </div>
			</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

import Alert from 'LocalComponents/Alert/Alert'

export default {
  name: 'UserSupportedNonprofits',
  
  components: {
    Alert,
  },

	props: {
		user: {
			type: Object,
			required: true,
    },
    
    /**
     * Enable edit mode
     */
    editMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data () {
    return {
      editLocationsId: {},
      tempChanges: [...this.user.nonprofits],
      alertOpened: true,
    }
  },
  
  methods: {
    /**
     * Handles delete clicked for every item
     * 
     * @param {Integer} id
     */
    onDeleteClicked (id) {
      this.$emit('delete', id)
    },

    /**
     * Handles edit clicked for an item
     */
    onEditClicked (id) {
      this.editLocationsId = id
    },

    /**
     * Closes the edit locations screen
     */
    closeEditLocations (id) {
      this.editLocationsId = null
    },

    /**
     * Adds a user location
     */
    setUserLocation (checked, nonprofitId, locationId) {
      /**
       * We first check if there's only one instance of a nonprofit in the User Nonprofit Location list.
       * If there's only one, we should set the locationId to null rather than delete the record
       * because this will remove the nonprofit on the location list.
       */
      const nonprofitPairWithNonprofitId = this.tempChanges.filter(np => np.nonprofitId === nonprofitId)


      if (!checked) {
        let nonprofits = []

        const foundIndex = this.tempChanges.findIndex((np) => {
          return np.locationId === locationId && np.nonprofitId === nonprofitId
        })


        if (nonprofitPairWithNonprofitId.length === 1) {
          nonprofits = this.tempChanges.map((np, index) => {
            if (index === foundIndex) {
              return {
                nonprofitId: np.nonprofitId,
                locationId: null,
              }
            }
            
            return np
          })
        } else {
          nonprofits = this.tempChanges.filter((np, index) => {
            return index !== foundIndex
          })
        }


        this.tempChanges = nonprofits
      } else {
        if (nonprofitPairWithNonprofitId.length === 1 && nonprofitPairWithNonprofitId.locationId === null) {
          const foundIndex = this.tempChanges.findIndex((np) => {
            return np.nonprofitId === nonprofitId
          })
          const nonprofits = this.tempChanges.map((np, index) => {
            if (index === foundIndex) {
              return {
                nonprofitId: np.nonprofitId,
                locationId,
              }
            }
            
            return np
          })

          this.tempChanges = nonprofits
        } else {
          this.tempChanges.push({nonprofitId, locationId})
        }
      }
    },

    /**
     * Checks if user has that location
     */
    checkIfUserHasLocation (nonprofitId, locationId) {
      const hasLocation = this.user.nonprofits.find(np =>{
        return np.locationId == locationId && np.nonprofitId == nonprofitId
      })

      return hasLocation
    },
    
    saveLocations (nonprofitId) {
      this.$emit('save', this.tempChanges)

      this.closeEditLocations(nonprofitId)
    },
  },


	computed: {
		...mapState({
			/**
			 * We only get the nonprofit once.
			 */
			nonprofits (state) {
				let nonprofitIds = []
				let nonprofits = []
				this.user.nonprofits.forEach(userNonprofit => {
				
					if(nonprofitIds.indexOf(userNonprofit.nonprofitId) === -1) {
						const nonprofit = state.nonprofits.data.find(nonprofit => nonprofit.id == userNonprofit.nonprofitId)

						nonprofitIds.push(userNonprofit.nonprofitId)
						nonprofits.push(nonprofit)
					}
				})

				return nonprofits
			}
		}),
  },
  
  watch: {
    editLocationsId () {
      this.tempChanges = [...this.user.nonprofits]

      this.alertOpened = true
    },
  },
}
</script>

<style lang='scss' scoped>
.user-nonprofits-list {
  &__item-wrapper {
		&:not(:last-child) {
			margin-bottom: .5em;
    }
  }

	&__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: underline;
    }
  }
  
  &__actions {
    .button {
      &:not(:last-child) {
        margin-right: .25em;
      }
    }
  }

  &__locations {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  &__locations-item {
    padding: .5em;
    background-color: $primary;
    color: #fff;
    margin-bottom: 2px;
    font-size: .875em;

    .checkbox {
			&:hover {
				color: #fff !important;
			}
		}
  }

  &__locations-item-actions {
    margin-top: 0.5em;
    .button {
      &:not(:last-child) {
        margin-right: .5em;
      }
    }
  }

  &__has-one-location-alert {
    padding:.75rem 1rem;
  }

  &__has-one-location-alert-text {
    font-size: 0.875rem;
  }
}
</style>

