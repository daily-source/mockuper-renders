<template>
	<div class='user-profile'>
		<app-header />
		<section class='user-details-section section'>
			<div class='container'>	
				<div class='user-profile__details columns'>
					<div class='column is-9'>
						<user-details 
							:user='user'	
						/>
					</div>
					<div class='column'>
						<h4 class='user-profile__heading user-profile__heading--underline'>Nonprofits I Support</h4>
						<user-supported-nonprofits 
							:user='user'	
						/>
					</div>
				</div>
			</div>
		</section>
		<section class='user-virtual-railroad-map-section user-section'>
			<div class='container'>
				<user-virtual-railroad-map 
					:user='user'
				/>
			</div>
		</section>
		<shared-footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import UserDetails from 'LocalComponents/User/UserDetails'
import UserSupportedNonprofits from 'LocalComponents/User/UserSupportedNonprofits'
import UserVirtualRailroadMap from 'LocalComponents/User/UserVirtualRailroadMap'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
	name: 'UserProfile',

	components:{
		AppHeader,
		UserDetails,
		UserSupportedNonprofits,
		UserVirtualRailroadMap,
		SharedFooter,
	},

	computed: {
		userId () {
			return this.$route.params.userId
		},

		...mapState({
			user (state) {
				return state.users.data.find(user => user.id == this.userId)
			},
		}),
	},
}
</script>

<style lang='scss' scoped>
.user-section {
	&:not(:last-child) {
		padding-bottom: 1.5em;
	}
} 
</style>
