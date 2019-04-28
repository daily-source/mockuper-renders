<template>
	<div class='user-nonprofits'>
		<div class='user-nonprofits__nonprofits-list-wrapper'>
			<ul class='user-nonprofits-list'>
				<li 
					class='user-nonprofits-list__item'
					v-for='nonprofit in nonprofits'
					:key='nonprofit.id'
				>
					<a :href='nonprofit.url'>{{ nonprofit.name }}</a>
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
}
</script>

<style lang='scss' scoped>
.user-nonprofits-list {
	&__item {
		&:not(:last-child) {
			margin-bottom: .5em;
    }
    
    a {
      text-decoration: underline;
    }
	}
}
</style>

