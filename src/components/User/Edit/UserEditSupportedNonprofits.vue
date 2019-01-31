<template>
	<div class='user-edit-supported-nonprofits'>
		<user-supported-nonprofits 
			:user='user'	
		/>
		<div class='user-edit-supported-nonprofits-additional'>
			<ol class='user-edit-supported-nonprofits-list'>
				<li 
					class='user-edit-supported-nonprofits-list__item'
					v-for='(nonprofit, index) in nonprofits'
					:key='index'
				>
					<div class='user-edit-supported-nonprofits-list__select-wrapper'>
						<user-edit-supported-nonprofits-select
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
				class='user-edit-supported-nonprofits__actions'
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
				>
					Search
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import UserSupportedNonprofits from 'LocalComponents/User/UserSupportedNonprofits'
import UserEditSupportedNonprofitsSelect from 'LocalComponents/User/Edit/UserEditSupportedNonprofitsSelect'
import SelectNonprofits from 'LocalComponents/Form/SelectNonprofits'
import VirtualRailroadMapVue from '../../VirtualRailroadMap.vue';

export default {
	name: 'UserEditSupportedNonprofits',

	components: {
		UserSupportedNonprofits,
		UserEditSupportedNonprofitsSelect,
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
			default: 3,
		},
	},

	data () {
		return {
			nonprofits: [...Array(this.inputMinimumCount)],
			validNonprofits: [],
			counter: 3,
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

<style lang='scss' scoped>
.user-edit-supported-nonprofits {
	&__actions {
		margin-top: 1em;
		display: flex;
		justify-content: space-between;
	}
}

.user-edit-supported-nonprofits-list {
	&__item {
		margin-top: 1em;
	}
}
</style>
