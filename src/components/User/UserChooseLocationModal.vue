<template>
  <modal
    :state='state'
    size='large'
    @modal:close='closeModal'
    @modal:open='openModal'
    class='user-choose-location-modal'
  >
    <div class='user-choose-location-modal__content' slot='content'>
      <p>After typing address details into the search box, you must choose a result from the dropdown list of results before you click Search. After you Search, the “Use This Location” button will become clickable.</p>
      <p>Type your location below, choose a result from the dropdown list that appears, click Search and the “Use This” button will become active. Click it to return to Edit Profile with the new location. To keep your old location, click the X to close this view.</p>
      <div class="user-choose-location__map-container">
        <location-chooser 
          submit-button-text='Use this Location'
          @placeChanged='saveLocation'
        />
      </div>
    </div>
    <button class='button is-text is-paddingless user-choose-location-modal__trigger' @click.prevent='' slot='trigger'>Edit</button>
  </modal>
</template>

<script>
import userGeolocation from '@/util/userGeolocation'
import geocoder from '@/util/geocoder'
import LocationChooser from 'LocalComponents/LocationChooser'

import Modal from 'Components/general/Modal'
import GoogleMap from 'LocalComponents/GoogleMap'
import Loader from 'Components/Shared/Loader'

export default {
  name: 'UserChooseLocationModal',

  mixins: [userGeolocation],
  
  components: {
    Modal,
    GoogleMap,
    Loader,
    LocationChooser,
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
      selectedPlaceTemp: null,
      google: null,
      geocoder: null,
      showMapLoadingOverlay: false,
      map: null,
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
     * Triggers when the map is clicked
     */
    onMapClicked (event) {
      const { latLng } = event

      this.geocodeLocation(latLng)
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
     * Sets the selected place to a temporary variable 
     * from the auto complete
     * 
     * @param {Object} place
     */
    setSelectedPlaceTemp (place) {
      this.selectedPlaceTemp = place
    },

    /**
     * Triggers when the user clicks on save
     */
    saveLocation (place, location) {
      this.$emit('placeChanged', place, location)

      this.closeModal()
    },
  },

  watch: {
    selectedPlace (place) {
      // Every time a place is changed, we fit the map's bounds
      // according to the place.
      let bounds = new this.google.maps.LatLngBounds()

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }

      this.map.fitBounds(bounds)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-choose-location {
  &__map-container {
    height: 620px;
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

<style lang='scss'>
.user-choose-location-modal {
  .location-chooser {
    height: 100%;
  }

  .location-chooser__map-container {
    height: 100%;
  }

  .modal-content {
    max-width: 1100px !important;
    min-height: 830px;
  }

  &__trigger {
    height: auto;
    padding: 0 !important;
  }
}
</style>
