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
            :width='250 '
            :height='250  '
            :placeholder-font-size='18'
            :placeholder-color='"#000"'
            class='nonprofit-register-form__photo-upload'
          />
        </div>
        <div class='nonprofit-register-form__details-column column'>
          <form @submit.prevent='onFormSubmit'>
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
        <div class="nonprofit-register-form__columns columns is-multiline">
          <div class="column nonprofit-register-form__location-column">
          <p>At least one location is required. The maximum is 12. Only add ones where you have a physical presence such as an office. Each location will appear on your profile page and also as a star on our Google map of anti-slavery nonprofits. After typing address details into the search box, you must choose a result from the dropdown list of results before you click Search. After you Search, the “Add” button will become clickable.</p>            
            <div class='field'>
              <div class='nonprofit-register-form__location-chooser-wrapper'>
                <location-chooser
                  ref='locationChooser'
                  :markers='locationChooserMarkers'
                  @placeChanged='onAddOfficeLocationClicked'
                />
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
      <div class="nonprofit-register-form__actions">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { extractUSLocationFromGeocodedLocation } from '@/util/locations'

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
      let state = ''
      let city = ''
      let geocodedLocation = ''

      const country = place.address_components.find(place => place.types.indexOf("country") !== -1 )

      if (country.short_name === 'US') {
        const extractedLocation = extractUSLocationFromGeocodedLocation(place)
        state = extractedLocation.state.long_name
        city = extractedLocation.city.long_name
        geocodedLocation = extractedLocation.formatedAddress
      } else {
        city = place.address_components.find(place => place.types.indexOf("locality") !== -1 )
        state = place.address_components.find(place => place.types.indexOf("administrative_area_level_1") !== -1 )
        geocodedLocation = `${city ? city.long_name : state.long_name}, ${country.long_name}`
      }

      const loc = {
        state,
        city,
        location: geocodedLocation,
        placeId: place.place_id,
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

    /**
     * Location Chooser Markers
     */
    locationChooserMarkers  () {
      return this.form.locations.map(location => {
        return {
          position: {
            lat: location.lat(),
            lng: location.lng(),
          },
          icon: require('@/assets/img/star_32.png')
        }
      })
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

  &__office-column {
    padding-right: 1.75rem;

    @include widescreen {
      padding-top: 118px;
    }
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
    font-size: 19px;
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

  &__location-column {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    flex-grow: 1;
    padding-right: 1rem;

    @include widescreen {
      flex-basis: 905px;
      max-width: 905px;
      width: 905px;
    }
  }

  &__location-chooser-wrapper {
    margin-bottom: 1.5rem;
  }

  &__avatar-column {
    max-width: 280px;
    width: 280px;
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
