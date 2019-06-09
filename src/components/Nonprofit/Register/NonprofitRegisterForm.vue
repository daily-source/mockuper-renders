<template>
  <div class='nonprofit-register-form'>
      <div class='nonprofit-register-form__columns columns'>
        <div class='nonprofit-register-form__avatar-column column is-3'>
          <p class='has-text-weight-bold nonprofit-register-form__subheading'>Nonprofit logo or photo</p>
          <!-- <avatar-upload 
            no-image-message='Profile Photo'
            @avatarChange='onAvatarChange'
            class='nonprofit-register-form__avatar-upload'
          /> -->
          <inline-image-editor 
            type='avatar'
            layout='overlay'
            :edition-is-enabled='true'
            :is-background='true'
            :is-standalone='true'
            :field-is-open='true'
          />
          <button type='submit' class='button is-primary'> Save Profile </button>
        </div>
        <div class='nonprofit-register-form__details-column column'>
          <form @submit.prevent='onFormSubmit'>
            <p class='has-text-weight-bold nonprofit-register-form__subheading'>Nonprofit Details</p>
            <nonprofit-register-form-details 
              :form-values='form'
              @detailsChanged='onNonprofitDetailsChanged'
              @addOfficeLocationClicked='onAddOfficeLocationClicked'
            />
          </form>
        </div>
      </div>
      <div class="nonprofit-register-form__choose-location">
        <p class='is-primary has-text-weight-bold nonprofit-register-form__subheading'>Add Your Location/s</p>
        <p>At least one location is required. The maximum is 12 locations. Each location you add will appear on your profile page and also as  a star on the Google map of anti-slavery nonprofits.</p>
        <div class="nonprofit-register-form__columns columns">
          <div class="column is-8">
            <div class='field'>
              <div class='location-chooser-wrapper'>
                <location-chooser
                  ref='locationChooser'
                  @placeChanged='onAddOfficeLocationClicked'
                />
              </div>
            </div>
            <div class='field is-grouped'>
              <div class='control'>
              </div>
            </div>
          </div>
          <div class='nonprofit-register-form__office-column column'>
            <p class='has-text-weight-bold'>Locations: </p>
            <p class='is-small'>This is how your list of locations will appear on your profile page.</p>
            <template v-if='form.locations.length > 0'>
              <ol>
                <li 
                  v-for='(location, index) in form.locations'
                  :key='location.placeId'
                  class='nonprofit-register-form__offices-item'
                >
                  <p>
                    <span class='nonprofit-register-form__offices-item-location'>{{ location.location }} </span>
                    <span class="nonprofit-register-form__offices-item-actions">
                      <button 
                        class='button is-small is-danger' @click.prevent.stop='removeLocation(index)'
                      >
                        Delete
                      </button>
                    </span>
                  </p>
                </li>
              </ol>
            </template>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AvatarUpload from 'LocalComponents/Avatar/AvatarUpload'
import NonprofitRegisterFormDetails from 'LocalComponents/Nonprofit/Register/NonprofitRegisterFormDetails'
import InlineImageEditor from 'Components/input/InlineImageEditor'
import LocationChooser from 'LocalComponents/LocationChooser'

export default {
  name: 'NonprofitRegisterForm',

  components: {
    AvatarUpload,
    NonprofitRegisterFormDetails,
    InlineImageEditor,
    LocationChooser,
  },

  data () {
    return {
      form: {
        picture: '',
        name: '',
        description: '',
        link: '',
        locations: [],
        selectedLocation: '',
        selectedPlace: '',
      }
    }
  },

  methods: {
    /**
     * Handles for submission
     */
    async onFormSubmit () {
      const newNonprofit = await this.registerNonprofit(this.form)

      this.$router.push({ name: 'nonprofit-details', params: {nonprofitId: newNonprofit.id}, query: {newNonprofit: 1} })
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
      if (this.form.locations.length >= 12) return
      // const state = place.address
      const state = place.address_components.find(place => place.types.indexOf("administrative_area_level_1") !== -1 )

      const city = place.address_components.find(place => place.types.indexOf("locality") !== -1 )

      const country = place.address_components.find(place => place.types.indexOf("country") !== -1 )

      const loc = {
        state: state.long_name,
        city: city ? city.long_name : state.long_name,
        placeId: place.place_id,
        location: `${city ? city.long_name : state.long_name}, ${country.long_name}`,
        ...location,
      }

      this.form.locations.push(loc)
    },

    /**
     * Event handler for whenever a nonprofit detail has changed
     * 
     * @param {Object} formValues
     */
    onNonprofitDetailsChanged (formValues) {
      this.form = {
        ...this.form,
        ...formValues,
      }
    },

    /**
     * Removes a location 
     */
    removeLocation(index) {
      this.form.locations = this.form.locations.filter((loc, locIndex) => {
        return index !== locIndex
      })
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

  &__offices-item {
    margin-bottom: .875rem;

    p {
      display: inline-flex;
      justify-content: space-between;
      width: calc(100% - 14px);
      margin-bottom: 0;
    }
  }

  &__subheading {
    font-size: 24px;
  }

  &__avatar-column {

  }

  
  ol > li {
    list-style: none;
    margin-bottom: 0.875em;
  }

  ol > li:before {
    content: counter(list) ". ";
    counter-increment: list;
    color: blue;
    width: 14px;
    display: inline-block;
  }

  &__offices-item-location {
    max-width: 75%;
    flex-basis: 75%;
    width: 75%;
    display: inline-block;
  }

  &__choose-location {
    margin-top: 1.5em;
    h3 {
      color: $secondary;
      margin-bottom: 1rem;
    }
  }

  &__details-column {
    max-width: 600px;
  }
}
</style>
