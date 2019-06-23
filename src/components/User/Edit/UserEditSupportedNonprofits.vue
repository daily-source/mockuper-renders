<template>
	<div class='user-edit-supported-nonprofits'>
		<user-supported-nonprofits 
			:user='user'	
      :edit-mode='true'
      @save='onUserSupportedNonprofitsSave'
      @delete='onDeleteClicked'
		/>
		<div class='user-edit-supported-nonprofits__additional'>
      <h4 data-v-387cfaac="" class="user-profile__heading">Add Another Nonprofit</h4>
      <div class='user-edit-supported-nonprofits__select-wrapper'>
        <user-add-nonprofits-select
          @removeButtonClicked='removeNonprofitSelect(index)'
          @locationChange='(locationPair) => onLocationChange(locationPair)'
          @nonprofitChange='onNonprofitChange'
          :show-action-buttons='false'
          ref='userAddNonprofitsSelect'
        />
        <div class="user-edit-supported-nonprofits__actions has-text-right">
          <button 
            class='button is-primary'
            @click='submitAdditionalNonprofits'
          >
            Submit
          </button>
        </div>
      </div>
      <p>To explore nonprofits to support, view our <router-link to='/nonprofit-directory' target='_blank' class='user-edit-supported-nonprofits__link'>directory</router-link>. It will open in a new window, so any changes you’ve made here will remain. When you find a nonprofit you like, close the directory to return here and enter the nonprofit in the menu above.</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

import UserSupportedNonprofits from 'LocalComponents/User/UserSupportedNonprofits'
import UserAddNonprofitsSelect from 'LocalComponents/User/UserAddNonprofitsSelect'
import SelectNonprofits from 'LocalComponents/Form/SelectNonprofits'
import VirtualRailroadMapVue from '../../VirtualRailroadMap.vue';

export default {
	name: 'UserEditSupportedNonprofits',

	components: {
		UserSupportedNonprofits,
		UserAddNonprofitsSelect,
		SelectNonprofits,
	},

	props: {
		user: {
			type: Object,
			required: false,
		},

		inputMinimumCount: {
			type: Number,
			required: false,
			default: 1,
		},

		addSearchLink: {
			type: Boolean,
			required: false,
			default: true,
		},
	},

	data () {
		return {
			nonprofits: [...Array(this.inputMinimumCount)],
			validNonprofits: [],
			counter: 1,
		}
	},

	methods: {
		setValidNonprofits () {
			this.validNonprofits = []
			this.nonprofits.forEach(nonprofit => {
				if (nonprofit) {
					this.validNonprofits.push(nonprofit)
				}
			})
		
			this.$emit('nonprofitsChange', this.validNonprofits, this.nonprofits)			
    },
    
    onUserSupportedNonprofitsSave (changes) {
      this.$emit('submit:locations', changes)      
    },

		/**
		 * Adds another Nonprofit Select
		 */
		addNonprofitSelect () {
			this.nonprofits.push(null)
		},

		/**
		 * Remove inputCount
		 * 
		 * @param {Number} index
		 */
		removeNonprofitSelect (index) {
			const nonprofits = this.nonprofits.filter((np, i) => {
				return (i !== index)
			})

			this.nonprofits = nonprofits
		},

		/**
		 * Handles `locationChange` events of Nonprofit Selects
		 * 
		 * We only listen to when a location changes because you can't
		 * really select a location when you didn't select any nonprofit.
		 * 
		 * @param {Object} locationPair A pair of the nonprofit ID with the locations selected
		 * @param {Number} index Index of the Nonprofit Select
		 */
		onLocationChange (locationPair) {
			if (locationPair) {
				const { nonprofitId, locationIds } = locationPair

				const nonprofitObjectArrs = locationIds.map(location => {
					return {
						nonprofitId,
						locationId: location,
					}
        })

        this.nonprofits = nonprofitObjectArrs
      } else {
        this.nonprofits = []
      }
			// this.setValidNonprofits()
    },
    
    /**
     * Handles when a user selects a nonprofit
     * 
     * @param {Object} nonprofit 
     */
    onNonprofitChange (nonprofit) {
      this.nonprofits = [{
        nonprofitId: nonprofit,
        locationId: 0,
      }]
    },

    /**
     * Submits the additional nonprofits
     */
    submitAdditionalNonprofits () {
      this.$emit('submit', this.nonprofits)
      this.$refs.userAddNonprofitsSelect.resetSelectValue()
    },

    /**
     * Emits delete event whenever a `delete` button is clicked
     */
    onDeleteClicked (id) {
      this.$emit('onDeleteClicked', id)
    },
	},

	computed: {
		/**
		 * Current length of the nonprofits
		 */
		nonprofitsCount () {
			return this.nonprofits.length
		},

	},
}
</script>

<style lang='scss' scoped>
.user-edit-supported-nonprofits {
	&__actions {
		margin-top: 1em;
		display: flex;
		justify-content: flex-end;
	}

  &__select-wrapper {
    margin-bottom: 1em;
  }

  &__additional {
    margin-top: 2.5em;
  }

  &__link {
    color: $blue;
    text-decoration: underline;
  }
}

.user-edit-supported-nonprofits-list {
	&__item {
		margin-top: 1em;
	}
}
</style>
