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
      <div class='user-choose-location-autocomplete'>
        <gmap-autocomplete
          @place_changed="setSelectedPlaceTemp"
          placeholder='Enter zip code or city/state'
          class='user-choose-location-autocomplete__input input'
        />
        <button 
          class='button is-primary'
          @click='setSelectedPlace'
        >
          Use
        </button>
      </div>
      <div class='user-choose-location__map-container' slot='content'>
        <google-map
          class='user-choose-location-map'
          @mapReady='onMapReady'
          @mapClicked='onMapClicked'
        >
          <gmap-marker 
            :position='selectedLocation'
          />
        </google-map>
      </div>
    </div>
    <button href='#' class='button is-text' slot='trigger'>Edit location</button>
  </modal>
</template>

<script>
import userGeolocation from '@/util/userGeolocation'

import Modal from 'Components/general/Modal'
import GoogleMap from 'LocalComponents/GoogleMap'

export default {
  name: 'UserChooseLocation',

  mixins: [userGeolocation],
  
  components: {
    Modal,
    GoogleMap,
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
      map.setOptions({
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
     * Sets the selectedPlace to the temporarily stored variable.
     * 
     * @param {Object} place
     */
    setSelectedPlace (place = null) {
      const location = place || this.selectedPlace

      this.setSelectedLocation(location.geometry.location)
    },

    /**
     * Reverse gecodes a point
     * 
     * @param {Object} latLng
     * 
     * @returns Object
     */
    geocodeLocation (latLng) {
      let location

      if (!this.geocoder) {
        this.geocoder = new this.google.maps.Geocoder
      }

      this.geocoder.geocode({'location': latLng}, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          this.setSelectedPlace(results[0])
        }
      })
    },
  },

  watch: {
    selectedPlace (val) {
      this.$emit('placeChange', val)
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
</style>
