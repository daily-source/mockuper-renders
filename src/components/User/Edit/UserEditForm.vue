<template>
	<form @submit.prevent.stop='onUserEditFormSubmit'>
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
	</form>
</template>

<script>
import { mapActions } from 'vuex'

import UserEditAvatar from 'LocalComponents/User/Edit/UserEditAvatar'
import UserEditDetails from 'LocalComponents/User/Edit/UserEditDetails'
import UserEditSupportedNonprofits from 'LocalComponents/User/Edit/UserEditSupportedNonprofits'

export default {
  name: 'UserEditForm',

	components: {
		UserEditAvatar,
		UserEditDetails,
		UserEditSupportedNonprofits,
	},

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	data () {
		return {
			userData: this.user,
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
			this.userData.nonprofits = [
				...this.userData.nonprofits,
				...nonprofits
			]	
		},
		
		/**
		 * Event handler for when the form is submitted.
		 */
		onUserEditFormSubmit () {
			this.editUser(this.userData)
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
}
</style>

