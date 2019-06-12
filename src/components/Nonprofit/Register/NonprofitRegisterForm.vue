<template>
  <div class='nonprofit-register-form'>
      <div class='nonprofit-register-form__columns columns'>
        <div class='nonprofit-register-form__avatar-column column'>
          <p class='has-text-weight-bold nonprofit-register-form__subheading'>Your logo or photo</p>
          <!-- <avatar-upload 
            no-image-message='Profile Photo'
            @avatarChange='onAvatarChange'
            class='nonprofit-register-form__avatar-upload'
          /> -->
          <croppa
            v-model='croppaObject'
            :width='310'
            :height='310'
            :placeholder-font-size='18'
            :placeholder-color='"#000"'
            class='nonprofit-register-form__photo-upload'
          />
        </div>
        <div class='nonprofit-register-form__details-column column'>
          <form @submit.prevent='onFormSubmit'>
            <!-- <p class='has-text-weight-bold nonprofit-register-form__subheading'>Nonprofit Details</p> -->
            <nonprofit-register-form-details 
              :form-values='form'
              @detailsChanged='onNonprofitDetailsChanged'
              @addOfficeLocationClicked='onAddOfficeLocationClicked'
            />
          </form>
        </div>
      </div>
      <div class="nonprofit-register-form__choose-location">
        <p class='is-primary has-text-weight-bold nonprofit-register-form__subheading'>Add Your Location(s) <span class="has-text-danger">*</span></p>
        <p>At least one location is required. The maximum is 12 locations. Each location you add will appear on your profile page and also as  a star on the Google map of anti-slavery nonprofits.</p>
        <div class="nonprofit-register-form__columns columns">
          <div class="column nonprofit-register-form__location-chooser-column">
            <div class='field'>
              <div class='nonprofit-register-form__location-chooser-wrapper'>
                <location-chooser
                  ref='locationChooser'
                  @placeChanged='onAddOfficeLocationClicked'
                />
              </div>
            </div>
            <div class='field is-grouped'>
              <div class='control'>
                <button 
                  type='submit' 
                  class='button is-primary'
                  :disabled='!isFormValid'
                  @click='onFormSubmit'
                > 
                  Save Profile 
                </button>
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
      },
      croppaObject: {},
    }
  },

  methods: {
    /**
     * Handles for submission
     */
    async onFormSubmit () {
      if (this.croppaObject.imageSet) {
        const avatar = this.croppaObject.generateDataUrl("image/jpeg", 0.8)

        this.form.picture = avatar
      }

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

  computed: {
    /**
     * Checks if the form is valid
     */
    isFormValid () {
      return this.croppaObject.imageSet && this.form.name && this.form.description && this.form.url
    },
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-register-form {
  margin-top: 1em;

  &__no-offices {
    font-size: .875rem;
  }

  &__avatar-column {
    max-width: 340px;
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
    font-size: 20px;
  }

  ol {
    counter-reset: list;
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
    max-width: 620px;
  }

  &__location-chooser-column {
    max-width: 720px;
    flex-basis: 720px;
    flex-grow: 1;
    flex-shrink: 0;
  }

  &__location-chooser-wrapper {
    margin-bottom: 1.5rem;
  }
}

</style>

<style lang="scss">
.nonprofit-register-form {
  &__photo-upload {
    margin-bottom: 1em;
    margin-top: 1.75em;
    position: relative;

    > canvas {
      border: 2px dashed $primary;
      cursor: pointer;
      background-color: #e6e6e6;
    }

    > svg {
      position: absolute;
      cursor: pointer;
    }
  }
}
</style>
