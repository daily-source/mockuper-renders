<template>
	<div class='user-profile'>
		<app-header />
		<intro-video />
		<section class='user-details-section section'>
			<div class='user-details-section__container container'>	
				<alert
          v-if='newUser'
          :open='open'
          @closeButtonClicked='open = false'
        >
					This is your profile page. To edit it, click the Edit Profile button at the bottom of any page.
				</alert>
				<div class='user-profile__details columns'>
					<div class='column is-7'>
						<user-details 
							:user='user'		
						/>
					</div>
					<div class='column is-3'>
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
import Alert from 'LocalComponents/Alert/Alert'
import UserDetails from 'LocalComponents/User/UserDetails'
import IntroVideo from 'LocalComponents/IntroVideo'
import UserSupportedNonprofits from 'LocalComponents/User/UserSupportedNonprofits'
import UserVirtualRailroadMap from 'LocalComponents/User/UserVirtualRailroadMap'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
	name: 'UserProfile',

	components:{
		AppHeader,
		Alert,
		IntroVideo,
		UserDetails,
		UserSupportedNonprofits,
		UserVirtualRailroadMap,
		SharedFooter,
	},

	
  data () {
    return {
      open: true,
    }
  },

	computed: {
		userId () {
			return this.$route.params.userId
		},

		newUser () {
			return this.$route.query.new
		},

		...mapState({
			user (state) {
				return state.users.data.find(user => user.id == this.userId)
			},
		}),
	},

	metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `${this.user.firstName} ${this.user.lastName} | Virtual Railroad`,      
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>

<style lang='scss' scoped>
.user-section {
	&:not(:last-child) {
		padding-bottom: 1.5em;
	}
} 

.user-details-section {
  &__container {
    padding: 0;

    @include tablet {
      padding: 0 15px;
    }
  }
}
</style>
