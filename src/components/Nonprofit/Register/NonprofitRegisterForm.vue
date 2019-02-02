<template>
  <div class='nonprofit-register-form'>
    <form @submit.prevent='onFormSubmit'>
      <div class='nonprofit-register-form__columns columns'>
        <div class='nonprofit-register-form__avatar-column column is-4'>
          <p class='has-text-weight-bold'>Nonprofit Photo</p>
          <avatar-upload 
            no-image-message='Profile Photo'
            @avatarChange='onAvatarChange'
            class='nonprofit-register-form__avatar-upload'
          />
          <button type='submit' class='button is-primary'> Save Profile </button>
        </div>
        <div class='nonprofit-register-form__details-column column is-5'>
          <p class='has-text-weight-bold'>Nonprofit Details</p>
          <nonprofit-register-form-details 
            :form-values='form'
            @addOfficeLocationClicked='onAddOfficeLocationClicked'
          />
        </div>
        <div class='nonprofit-register-form__office-column column'>
          <p class='has-text-weight-bold'>List of offices</p>
          <template v-if='form.locations.length > 0'>
            <ol>
              <li 
                v-for='location in form.locations'
                :key='location.placeId'
              >
                {{ location.location }}
              </li>
            </ol>
          </template>
          <template v-else>
            <p class='is-small nonprofit-register-form__no-offices'>You haven't add any office locations yet. You can add one by clicking anywhere or searching a place from the map below and clicking on 'Add Office Location' button.</p>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AvatarUpload from 'LocalComponents/Avatar/AvatarUpload'
import NonprofitRegisterFormDetails from 'LocalComponents/Nonprofit/Register/NonprofitRegisterFormDetails'

export default {
  name: 'NonprofitRegisterForm',

  components: {
    AvatarUpload,
    NonprofitRegisterFormDetails,
  },

  data () {
    return {
      form: {
        picture: '',
        name: '',
        description: '',
        link: '',
        locations: []
      }
    }
  },

  methods: {
    /**
     * Handles for submission
     */
    onFormSubmit () {
      this.registerNonprofit(this.form)
    },

    /**
     * Handles avatar upload changes
     * 
     * @param {Object} file File object containing the file uploaded and the file URL
     */
    onAvatarChange (file) {
      this.form.picture = file.url
    },

    /**
     * Handles adding location
     * 
     * @param {Object} place Geomap Result object
     * @param {Object} location latLng object
     */
    onAddOfficeLocationClicked (place, location) {
      const loc = {
        placeId: place.place_id,
        location: place.formatted_address,
        ...location,
      }

      this.form.locations.push(loc)
    },

    ...mapActions({
      registerNonprofit: 'nonprofits/registerNonprofit',
    }),
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-register-form {
  margin-top: 1em;

  &__no-offices {
    font-size: .875rem;
  }

  &__avatar-upload {
    margin-bottom: 1em;
  }
}
</style>
