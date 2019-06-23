<template>
	<div class='select-nonprofit'>
		<div class='select is-fullwidth'>
			<select
				v-model='nonprofit'
				class='select-nonprofit__select'
			>
				<option
					value='0'
				>
					Please select a nonprofit
				</option>
				<option
					v-for='nonprofit in nonprofits'
					:key='nonprofit.id'
					:value='nonprofit.id'
				>
				{{ nonprofit.name }}
				</option>
			</select>
		</div>
		<div 
			class='select-nonprofit__locations' 
			v-if='selectedNonprofit'
		>
			<p class='intro-text'>They have multiple locations. Choose the region you support: 
				<button class='button is-small is-text is-paddingless' @click.stop.prevent='moreInfoButtonClicked'>?</button> 
			</p>
			<div 
				class='select-nonprofit__location'
				v-for='location in selectedNonprofit.locations'
				:key='location.id'
			>
				<label class='checkbox'>
					<input 
						type='checkbox'
						@change='(event) => onLocationChange(event.target.checked, location.id)'
						:key='`checkbox-${selectedNonprofit.id}-${location.id}`'
					>
					{{ location.location }}
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'SelectNonprofits',

	props: {
		value: {
			type: [Number, String],
			required: false,
			default: 0,
		},

		exclude: {
			type: Array,
			required: false,
			default: () => {
				return []
			},
		},
	},

	data () {
		return {
			nonprofit: this.value,
			locations: [],
		}
	},

	methods: {
		/**
		 * Handles when a location is checked or unchecked
		 * 
		 * @param {Boolean} val
		 * @param {Number} id
		 */
		onLocationChange (val, id) {
			if (val) {
				this.addLocation(id)
				return
			}
			
			this.removeLocation(id)
		},

		/**
		 * Pushes the ID to our array of locations.
		 * 
		 * @param {Number} id
		 */
		addLocation (id) {
			this.locations.push(id)
		},

		/**
		 * Removes a location from the array
		 */
		removeLocation (id) {
			this.locations = this.locations.filter(location => location !== id)
		},

		/**
		 * Event that triggers when the More info button is clicked
		 */
		moreInfoButtonClicked () {
			this.$emit('moreInfoClicked')
		},
	},

	computed: {
		/** 
		 * The selected nonprofit
		 */
		selectedNonprofit () {
			return this.nonprofits.find(nonprofit => nonprofit.id == this.nonprofit)
		},

		/**
		 * The selected locations
		 */
		selectedLocations () {
			const filtered = (this.locations.filter(location => location))

			return filtered.map(location => {
				return this.selectedNonprofit.locations.find(npLocation => npLocation.id === location)
			})
		},

		/** 
		 * The attirubutes to inherit
		 */
		attrs () {
			const { id } = this.$attrs

			return {
				id,
			}
		},

		...mapState({
			nonprofits (state) {
				const nonprofits =  state.nonprofits.data.filter(nonprofit => {
					return this.exclude.indexOf(nonprofit.id) == -1
				})

				return nonprofits
			},
		}),
	},

	watch: {
		nonprofit (val) {
			this.locations = []

			this.$emit('nonprofitChange', val)
		},

		locations (val) {
			let locationPair = null

      locationPair = {
        nonprofitId: this.nonprofit,
        locationIds: val,
      }
			
			this.$emit('locationChange', locationPair, this.selectedNonprofit, this.selectedLocations)
		},
	},
}
</script>

<style lang="scss" scoped>
.select-nonprofit {
	&__locations {
		.intro-text {
			margin-top: .5em;
			margin-bottom: 0.5em;
			font-size: .875rem;

			button {
				vertical-align: middle;
				text-decoration: none;
				font-size: .75rem;
				border-radius: 100%;
				color: #fff;
				background-color: $info;
				width: 20px;
				height: 20px;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	&__location {
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
}
</style>
