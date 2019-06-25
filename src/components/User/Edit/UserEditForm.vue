<template>
  <div class="user-edit">
		<alert
			:open='success'
			@closeButtonClicked='dismissAlert'
		>
			{{ successMessage }}
		</alert>
		<div class='user-edit-form__wrapper columns'>
			<div class='user-edit-form__avatar-wrapper column'>
				<user-edit-avatar 
					:user='user'	
					@avatarChange='onAvatarChange'
				/>
			</div>
			<div class='user-edit-form__details-column column'>
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
			<div class='column is-4'>
				<h4 class='user-profile__heading user-profile__heading--underline'>Nonprofits I Support</h4>
				<user-edit-supported-nonprofits
					:user='user'
          @submit:locations='onEditNonprofitsLocationsSubmit'
					@submit='onEditNonprofitsSubmit'
          @onDeleteClicked='deleteNonprofit'
				/>
			</div>
		</div>
		<div class='user-edit-form__location'>
			<user-virtual-railroad-map 
        :user='user'
      />
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
import UserVirtualRailroadMap from 'LocalComponents/User/UserVirtualRailroadMap'

export default {
  name: 'UserEditForm',

	components: {
		UserEditAvatar,
		UserEditDetails,
		UserEditSupportedNonprofits,
    GoogleMap,
    UserVirtualRailroadMap,
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
      successMessage: 'Profile updated successfuly.'
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
    
    onEditNonprofitsLocationsSubmit (nonprofits) {
      this.userData.nonprofits = [
        ...nonprofits,
      ]
    
			this.processUserUpdate(this.userData, 'Your supported nonprofits has been successfuly updated.')  
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
    
			this.processUserUpdate(this.userData, 'Your supported nonprofits has been successfuly updated.')      
		},
		
		/**
		 * Event handler for when the form is submitted.
		 */
		async onUserEditFormSubmit () {
			await this.processUserUpdate(this.userData)
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

      this.processUserUpdate(this.userData, 'Your supported nonprofits has been successfuly updated.')
    },


    /**
     * Calls `updateUser` plus
     */
    processUserUpdate (user, message = 'Profile updated successfully.') {
      this.updateUser(user)

      this.successMessage = message
      this.success = true
    },

		...mapActions({
			updateUser: 'users/updateUser'
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
    max-width: 600px;
  }

	&__location {
		height: 580px;
    position: relative;
    margin-bottom: .625rem;
  }

	&__map {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
		width: 100%;
		max-width: 1024px;
		margin-left: auto;
		margin-right: auto;
		height: 100%;
	}
}
</style>
