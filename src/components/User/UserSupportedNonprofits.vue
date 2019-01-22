<template>
	<div class='user-nonprofits'>
		<div class='user-nonprofits__nonprofits-list-wrapper'>
			<ul class='user-nonprofits-list'>
				<li 
					class='user-nonprofits-list__item'
					v-for='nonprofit in nonprofits'
					:key='nonprofit.id'
				>
					{{ nonprofit.name }}
			</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'UserSupportedNonprofits',

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	computed: {
		...mapState({
			nonprofits (state) {
				return this.user.nonprofits.map(userNonprofit => state.nonprofits.data.find(nonprofit => nonprofit.id == userNonprofit))
			}
		}),
	},
}
</script>

<style lang='scss' scoped>
.user-nonprofits-list {
	&__item {
		&:not(:last-child) {
			margin-bottom: .5em;
		}
	}
}
</style>

