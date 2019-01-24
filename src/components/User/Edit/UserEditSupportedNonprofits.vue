<template>
	<div class='user-edit-supported-nonprofits'>
		<user-supported-nonprofits 
			:user='user'	
		/>
		<div class='user-edit-supported-nonprofits-additional'>
			<ol class='user-edit-supported-nonprofits-list'>
				<li class='user-edit-supported-nonprofits-list__item' v-for='n in inputCount'>
					<select-nonprofits 
						:id='`select-nonprofit-${n}`' 
						v-model='nonprofits[n]'
						:exclude='user.nonprofits'
					/>	
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
import UserSupportedNonprofits from 'LocalComponents/User/UserSupportedNonprofits'
import SelectNonprofits from 'LocalComponents/Form/SelectNonprofits'

export default {
	name: 'UserEditSupportedNonprofits',

	components: {
		UserSupportedNonprofits,
		SelectNonprofits,
	},

	props: {
		user: {
			type: Object,
			required: false,
		},
	},

	data () {
		return {
			inputCount: 3,
			nonprofits: [],
		}
	},

	methods: {
		/** 
		 * Handler for whenever nonprofits change
		 */
		onNonprofitsChange () {
			const nonprofits = this.nonprofits.filter(id => id != 0 && id !== undefined && id !== null)

			this.$emit('nonprofitsChange', nonprofits)
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
.user-edit-supported-nonprofits-list {
	&__item {
		margin-top: 1em;
	}
}
</style>
