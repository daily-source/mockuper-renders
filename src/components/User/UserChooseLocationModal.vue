<template>
  <modal
    :state='state'
    size='small'
    @modal:close='closeModal'
    @modal:open='openModal'
    class='user-choose-location-modal'
  >
    <div class='user-choose-location-modal__content' slot='content'>
      <p class='has-text-centered'>Click on the map to choose a location. <br /> You can also search for a place and use it instead.</p>
      <!-- <div class='user-choose-location-autocomplete'>
        <gmap-autocomplete
          @place_changed="setSelectedPlaceTemp"
          placeholder='Enter zip code or city/state'
          class='user-choose-location-autocomplete__input input'
          :types='["(regions)"]'
        />
        <button 
          class='button is-primary'
          @click.prevent.stop='setSelectedPlace()'
        >
          Use
        </button>
      </div>
      <div class='user-choose-location__map-container'>
        <transition name='loading-fade'>
          <div 
            class='user-choose-location__loader'
            v-show='showMapLoadingOverlay'
          >
            <loader 
              :width='50'
              :height='50'
              color='#dedede'
              message='Geocoding point. Please wait...'
            />
          </div>
        </transition>
        <google-map
          class='user-choose-location-map'
          @mapReady='onMapReady'
          @mapClicked='onMapClicked'
        >
          <gmap-marker 
            :position='selectedLocation'
          />
        </google-map>
      </div> -->
      <location-chooser 
        @placeSelected='setSelectedPlace'
      />
      <div class='user-choose-location-actions'>
        <button 
          class='user-choose-location-actions__button button is-danger'
          @click.stop.prevent='closeModal'
        >
          Cancel
        </button>
        <button 
          class='user-choose-location-actions__button button is-primary'
          @click.stop.prevent='saveLocation'
          :disabled='!selectedPlace && !selectedLocation'
        >
          Save
        </button>
      </div>
    </div>
    <button href='#' class='button is-text' slot='trigger'>Edit location</button>
  </modal>
</template>

<script>
import userGeolocation from '@/util/userGeolocation'
import geocoder from '@/util/geocoder'

import Modal from 'Components/general/Modal'
import LocationChooser from 'LocalComponents/LocationChooser'
import Loader from 'Components/Shared/Loader'

export default {
  name: 'UserChooseLocationModal',

  mixins: [userGeolocation],
  
  components: {
    Modal,
    LocationChooser,
    Loader,
  },

  props: {
    /**
     * The initial state of the modal
     */
    initialState: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * The initial userPosition
     */
    intialUserPosition: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data () {
    return {
      state: this.initialState,
      selectedLocation: this.intialUserPosition && {
        lat: this.intialUserPosition.latitude,
        lng: this.intialUserPosition.longitude,
      },
      selectedPlace: null,
    }
  },

  mounted () {
    this.getUserLocation()
  },

  methods: {
    /**
     * Closes the modal
     */
    closeModal () {
      this.state = false
    },

    /**
     * Opens the modal
     */
    openModal () {
      this.state= true
    },

    /**
     * Triggers when the map is ready
     * 
     * @param {Object} map
     */
    onMapReady (map, google) {
      this.google = google
      this.map = map
      this.map.setOptions({
        draggableCursor: 'pointer',
      })
    },

    /**
     * Sets the selectedPlace to the temporarily stored variable.
     * 
     * @param {Object} place
     */
    setSelectedPlace (place) {
      this.selectedPlace = place

      this.setSelectedLocation(place.geometry.location)
    },

    /**
     * Sets the user position
     * 
     * @param {Object} latLng
     */
    setSelectedLocation (latLng) {
      this.selectedLocation = latLng
    },


    /**
     * Triggers when the user clicks on save
     */
    saveLocation () {
      this.$emit('placeChanged', this.selectedPlace, this.selectedLocation)

      this.closeModal()
    },
  },
}
</script>

<style lang="scss" scoped>
.user-choose-location {
  &__map-container {
    height: 300px;
    width: 100%;
    position: relative;
  }

  &__loader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(#000, .3);
    color: #fff;

    p {
      text-align: center;
      margin-top: .5em;
      color: #fff;
    }
  }
}

.user-choose-location-map {
  position: absolute;
  height: 100%;
  width: 100%;
}

.user-choose-location-autocomplete {
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;

  &__input {
    max-width: 250px;
    margin-right: .5em;
  }
}

.user-choose-location-modal {
  .modal-content {
    margin-top: 0;
  }
}

.user-choose-location-actions {
  text-align: right;
  margin-top: 1em;
  &__button {
    &:not(:last-child) {
      margin-right: .5em;
    }
  }
}

// Transitions
.loading-fade-enter-active, .loading-fade-leave-active {
  transition: opacity .5s;
}
.loading-fade-enter, .loading-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
