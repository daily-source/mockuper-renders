<template>
	<div class='select is-fullwidth'>
		<select
			v-bind='attrs'
			v-on='listeners'
			v-model='selected'
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
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'SelectNonprofits',

	inheritAttrs: false,

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
			selected: this.value,
		}
	},

	computed: {
		/** 
		 * The selected nonprofit
		 */
		selectedNonProfit () {
			return this.nonprofits.find(nonprofit => nonprofit.id == this.selected)
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

		/** 
		 * The listeners to inherit
		 */
		listeners () {
			return {
				...this.$listeners,
				change: event => {
					this.$emit('input', event.target.value)
				},
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
}
</script>

