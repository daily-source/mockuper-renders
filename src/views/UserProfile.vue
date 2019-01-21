<template>
	<div class='user-profile'>
		<app-header />
		<section class='user-details-section section'>
			<div class='container'>	
				<div class='user-profile__details columns'>
					<div class='column is-7'>
						<user-details 
							:user='user'	
						/>
					</div>
					<div class='column'>
						<user-supported-nonprofits 
							:user='user'	
						/>
					</div>
				</div>
			</div>
		</section>
		<section class='user-about-section section' v-if='user.about'>
			<div class='container'>
				<p class='user-about__about'>{{ user.about }}</p>
			</div>
		</section>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import UserDetails from 'LocalComponents/User/UserDetails'
import UserSupportedNonprofits from 'LocalComponents/User/UserSupportedNonprofits'

export default {
	name: 'UserProfile',

	components:{
		AppHeader,
		UserDetails,
		UserSupportedNonprofits,
	},

	computed: {
		profileId () {
			return this.$route.params.profileId
		},

		...mapState({
			user (state) {
				return state.users.data.find(user => user.id == this.profileId)
			},
		}),
	},
}
</script>
