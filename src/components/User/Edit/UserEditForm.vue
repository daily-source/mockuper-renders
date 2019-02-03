<template>
	<form @submit.prevent.stop='onUserEditFormSubmit'>
		<alert
			:open='success'
			@closeButtonClicked='dismissAlert'
		>
			Profile updated successfuly.
		</alert>
		<div class='user-edit-form__wrapper columns'>
			<div class='user-edit-avatar__wrapper column is-3'>
				<user-edit-avatar 
					:user='user'	
					@avatarChange='onAvatarChange'
				/>
			</div>
			<div class='column'>
				<h4 class='user-profile__heading user-profile__heading--underline'>User Details</h4>
				<user-edit-details 
					:user='user'	
					@userDetailsChange='onUserDetailsChange'
				/>	
				<button type='submit' class='user-edit-form__submit button is-primary'>Save Profile</button>
			</div>
			<div class='column is-4'>
				<h4 class='user-profile__heading user-profile__heading--underline'>Nonprofits I Support</h4>
				<user-edit-supported-nonprofits 
					:user='user'	
					@nonprofitsChange='onNonprofitsChange'
				/>
			</div>
		</div>
		<div class='user-edit-form__location'>
			<google-map
				class='user-edit-form__map'
			>
				<gmap-marker 
					:position='{lat: userData.latitude, lng: userData.longitude}'
				/>
			</google-map>
		</div>
	</form>
</template>

<script>
import { mapActions } from 'vuex'

import Alert from 'LocalComponents/Alert/Alert'
import UserEditAvatar from 'LocalComponents/User/Edit/UserEditAvatar'
import UserEditDetails from 'LocalComponents/User/Edit/UserEditDetails'
import UserEditSupportedNonprofits from 'LocalComponents/User/Edit/UserEditSupportedNonprofits'
import GoogleMap from 'LocalComponents/GoogleMap'

export default {
  name: 'UserEditForm',

	components: {
		UserEditAvatar,
		UserEditDetails,
		UserEditSupportedNonprofits,
		GoogleMap,
		Alert,
	},

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	data () {
		return {
			userData: {
				...this.user,
			},
			success: false,
		}	
	},

	methods: {
		/** 
		 * Event handler for on avatar change.
		 *
		 * @param {Object} file
		 */
		onAvatarChange (file) {
			this.userData.picture = file.url
		},

		/**
		 * Event handler for whenever the user details change.
		 *
		 * @param {Object} userDetails
		 */
		onUserDetailsChange (userDetails) {
			this.userData = {
				...this.userData,
				...userDetails,
			}
		},

		/**
		 * Event handler for whenever the nonprofits change.
		 *
		 * @param {Array} nonprofits
		 */
		onNonprofitsChange (nonprofits) {
			nonprofits.map(nonprofitLocations => {
				this.userData.nonprofits = [
					...this.userData.nonprofits,
					...nonprofitLocations,
				]	
			})
		},
		
		/**
		 * Event handler for when the form is submitted.
		 */
		async onUserEditFormSubmit () {
			await this.editUser(this.userData)
			this.success = true
			window.scrollTo(0,0)
		},

		/**
		 * Hides the alert
		 */
		dismissAlert () {
			this.success = false;
		},

		...mapActions({
			editUser: 'users/updateUser'
		}),
	},
}
</script>

<style lang='scss' scoped>
.user-edit-form {
	&__submit {
		margin-top: 1em;
	}

	&__location {
		height: 350px;
		position: relative;
	}

	&__map {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
		width: 100%;
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
		height: 100%;
	}
}
</style>



