<template>
  <div class="user-edit">
		<!-- <alert
			:open='success'
			@closeButtonClicked='dismissAlert'
		>
			Profile updated successfuly.
		</alert> -->
		<div class='user-edit-form__wrapper columns'>
			<div class='user-edit-form__avatar-wrapper column'>
				<user-edit-avatar 
					:user='user'	
					@avatarChange='onAvatarChange'
				/>
			</div>
			<div class='user-edit-form__details-column column'>
				<h4 class='user-profile__heading user-profile__heading--underline'>User Details</h4>
	      <form @submit.prevent.stop='onUserEditFormSubmit'>
          <user-edit-details 
            :user='user'	
            @userDetailsChange='onUserDetailsChange'
          />	
          <div class="user-edit-form__submit-block has-text-right">
            <button type='submit' class='user-edit-form__submit button is-primary'>Save Profile</button>
          </div>
	      </form>
			</div>
			<div class='column is-3'>
				<h4 class='user-profile__heading user-profile__heading--underline'>Nonprofits I Support</h4>
				<user-edit-supported-nonprofits 
					:user='user'	
					@submit='onEditNonprofitsSubmit'
          @onDeleteClicked='deleteNonprofit'
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
  </div>
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
		onEditNonprofitsSubmit (nonprofits) {
      this.userData.nonprofits = [
        ...this.userData.nonprofits,
        ...nonprofits,
      ]
    
			this.editUser(this.userData)      
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
    
    /**
     * Removed a nonprofit from the user
     */
    deleteNonprofit (id) {
      const nonprofits = this.userData.nonprofits.filter(np => np.nonprofitId !== id)
      
      this.userData.nonprofits = nonprofits

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

  &__avatar-wrapper {
    max-width: 195px;
  }

  &__details-column {
    max-width: 585px;
  }

	&__location {
		height: 500px;
		position: relative;
	}

	&__map {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
		width: 100%;
		max-width: 960px;
		margin-left: auto;
		margin-right: auto;
		height: 100%;
	}
}
</style>



