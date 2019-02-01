<template>
  <div class='user-add-nonprofits'>
    <div class='user-add-nonprofits-additional'>
			<ol class='user-add-nonprofits-list'>
				<li 
					class='user-add-nonprofits-list__item'
					v-for='(nonprofit, index) in nonprofits'
					:key='index'
				>
					<div class='user-add-nonprofits-list__select-wrapper'>
						<user-add-nonprofits-select
							:id='`user-edit-supported-nonprofit-${index}`'
							:key='nonprofit ? nonprofit.id : Date.now()'
							@removeButtonClicked='removeNonprofitSelect(index)'
							@locationChange='(locationPair) => onLocationChange(locationPair, index)'
							:show-action-buttons='nonprofitsCount > inputMinimumCount'
						/>
					</div>
				</li>
			</ol>
			<div 
				class='user-add-nonprofits-list__actions'
			>
				<button 
					class='button is-small is-primary'
					@click.prevent.stop='addNonprofitSelect'
				>
					Add another
				</button>
				<router-link 
					class='button is-small is-primary'
					to='/nonprofit-directory'
					v-if='addSearchLink'
				>
					Search
				</router-link>
			</div>
		</div>
  </div>
</template>

<script>
import UserAddNonprofitsSelect from 'LocalComponents/User/UserAddNonprofitsSelect'

export default {
  name: 'UserAddNonprofits',

  components: {
    UserAddNonprofitsSelect,
  },

  props: {
		inputMinimumCount: {
			type: Number,
			required: false,
			default: 3,
		},

		addSearchLink: {
			type: Boolean,
			required: false,
			default: true,
    },
    
    maximumInputCount: {
      type: Number,
      required: false,
      default: 8,
    },
  },
  
  data () {
		return {
			nonprofits: [...Array(this.inputMinimumCount)],
      counter: 3,
      validNonprofits: [],
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

		/**
		 * Adds another Nonprofit Select
		 */
		addNonprofitSelect () {
      if (this.nonprofitsCount < this.maximumInputCount) {
			  this.nonprofits.push(null)
      }
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
		onLocationChange (locationPair, index) {
			if (locationPair) {
				const { nonprofitId, locationIds } = locationPair

				const nonprofitObjectArrs = locationIds.map(location => {
					return {
						nonprofitId,
						locationId: location,
					}
				})

				this.nonprofits[index] = [
					...nonprofitObjectArrs
				]
			}

			this.setValidNonprofits()
		}
  },

  computed: {
		/**
		 * Current length of the nonprofits
		 */
		nonprofitsCount () {
			return this.nonprofits.length
		},

	},
  
  
	watch: {
		nonprofits: {
			handler: 'onNonprofitsChange',
			deep: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.user-add-nonprofits-list {
	&__item {
		margin-top: 1em;
	}

  &__actions {
		margin-top: 1em;
		display: flex;
		justify-content: space-between;
	}
}
</style>
