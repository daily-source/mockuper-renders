<template>
  <div class='user-register-step-two'>
    <div class='container'>
      <form @submit.prevent='onFormSubmit'>
        <div class='columns user-register-step-two__columns'>
          <div class='column is-4'>
            <p>Please add a profile picture and enter your approximate location here:</p>
            <user-avatar-upload 
              @avatarChange='onUserAvatarChange'
            />
          </div>
          <div class='column'>
            <user-choose-location 
              @placeChanged='onPlaceChange'
            />
          </div>
        </div>
        <div class='field is-grouped'>
          <div class='control'>
            <button class='button is-primary' type='submit'>Finish</button>
          </div>
          <div class='control'>
            <button @click.prevent.stop='onBackClicked' class='button is-danger user-register__back' type='submit'>Back</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserAvatarUpload from 'LocalComponents/User/UserAvatarUpload'
import UserChooseLocation from 'LocalComponents/User/UserChooseLocation'

export default {
  name: 'UserRegisterFormStepTwo',

  components: {
    UserAvatarUpload,
    UserChooseLocation,
  },

  data () {
    return {
      form: {
        picture: null,
        location: null,
        latitude: null,
        longitude: null,
      }
    }
  },

  methods: {
    /**
     * Handles on avatar change
     * 
     * @param {Object} file Object that contains the file info and the file URL
     */
    onUserAvatarChange (file) {
      this.form.picture = file.url
    },

    /**
     * Handles when place changes on the UserChooseLocation component.
     * 
     * @param {Object} place Geocoder Response object from Google Maps API
     * @param {Object} location latLng Object from Google Maps API
     */
    onPlaceChange (place, location) {
      this.form.location = place.formatted_address
      this.form.latitude = location.lat()
      this.form.longitude = location.lng()
    },

    /**
     * Triggers when form the form is submitted.
     */
    onFormSubmit () {
      this.$emit('submit', this.form, true)
    },

    /**
     * Trigers when the back button is clicked
     */
    onBackClicked () {
      this.$emit('onBackClicked')
    }
  },
}
</script>

<style lang="scss" scoped>
.user-register-step-two {
  &__columns {
    align-items: center;
  }
}
</style>
