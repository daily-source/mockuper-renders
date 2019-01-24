<template>
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
			/>	
		</div>
		<div class='column is-4'>
			<h4 class='user-profile__heading user-profile__heading--underline'>Nonprofits I Support</h4>
			<user-edit-supported-nonprofits 
				:user='user'	
			/>
		</div>
	</div>
</template>

<script>
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
	},
}
</script>
