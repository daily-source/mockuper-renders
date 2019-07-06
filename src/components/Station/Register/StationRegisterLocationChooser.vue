<template>
  <div class="station-register-location-chooser">
    <div class="container">
      <p class='station-register-location-chooser__instructions'>After typing address details into the search box, you must choose a result from the dropdown list of results before you click Search. After you Search, the "Use Location" button will become clickable.</p>
      <div class="station-register-location-chooser__autocomplete">
        <gmap-autocomplete
          @place_changed="setSelectedPlaceTemp"
          ref='autocomplete'
          placeholder='Enter zip code, city/state or city/country'
          class='station-register-location-chooser__autocomplete-input input'
          :types='["(regions)"]'
        />
        <div class="station-register-location-chooser__autocomplete-actions is-flex">
          <button 
            class='button is-primary'
            @click.prevent.stop='setSelectedPlace()'
          >
            Search
          </button>
          <button 
            class='button is-primary'
            @click.prevent.stop='submitLocation'
            :disabled='!selectedLocation || !selectedPlace'
          >
            Use this location
          </button>
        </div>
      </div>
      <div 
        class="station-register-location-chooser_autocomplete-errors"
        v-if='locationChooserError'
      >
        <p class='has-text-danger has-text-weight-bold help'>* {{ locationChooserError }} Please try another search.</p>
      </div>
    </div>
    <div class="station-register-location-chooser__map-section">
      <general-info 
        :opened='true'
        class='station-general-info'
      />
      <home-page-actions 
        :show-play-button='false'
      />
      <station-map 
        :markers='markers'
        @map:ready='onMapReady'
      />
      <map-legends 
        :opened='opened'
        @toggle='toggleLegends'
      />
    </div>
  </div>
</template>

<script>
import userGeolocation from '@/util/userGeolocation'
import geocoder from '@/util/geocoder'

import Loader from 'Components/Shared/Loader'
import MapLegends from 'LocalComponents/MapLegends'
import GeneralInfo from 'LocalComponents/General/GeneralInfo'
import HomePageActions from 'LocalComponents/HomePageActions'
import StationMap from 'LocalComponents/Station/StationMap'

export default {
  props: {
    station: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },

  name: 'StationRegisterLocationChooser',

  components: {
    Loader,
    StationMap,
    MapLegends,
    GeneralInfo,
    HomePageActions,
  },

  data () {
    return {
      opened: true,
      selectedPlaceTemp: null,
      selectedPlace: null,
      selectedLocation: this.intialUserPosition && {
        lat: this.intialUserPosition.latitude,
        lng: this.intialUserPosition.longitude,
      },
      map: null,
      google: null,
      locationChooserError: null,
    }
  },

  methods: {
    toggleLegends () {
      this.opened = !this.opened
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
    setSelectedPlace (place = this.selectedPlaceTemp) {
      if (place) {
        this.selectedPlace = place
        this.setSelectedLocation(place.geometry.location)
      } else {
        this.$emit('placeError', { message: 'Place not found.' })
        this.locationChooserError = 'No place found/selected.'
        this.selectedPlace = null
        this.selectedLocation = null
        this.resetMap()
      }

      this.selectedPlaceTemp = null
    },

    /**
     * Reverse gecodes a point
     * 
     * @param {Object} latLng
     * 
     * @returns Object
     */
    async geocodeLocation (latLng) {
      if (!this.geocoder) {
        this.geocoder = new this.google.maps.Geocoder
      }

      this.showMapLoadingOverlay = true

      const location = await geocoder.geocodeLocation(this.geocoder, latLng)

      this.showMapLoadingOverlay = false

      console.log(location)

      this.setSelectedPlace(location)
    },

    resetMap () {
      this.map.setCenter({ lat: 37.38390077975928, lng: 2.008774238974298 })
      this.map.setZoom(3)
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
     * Submits the location
     */
    submitLocation () {
      if (this.selectedPlace && this.selectedLocation) {
        this.$emit('place:submit', this.selectedPlace, this.selectedLocation)
      }

      this.selectedPlace = null
      this.selectedLocation = null
      this.$refs.autocomplete.$refs.input.value = ''
      this.locationChooserError = null
    },
  },

  computed: {
    markers () {
      if (this.selectedLocation) {
        return [
          {
            position: {
              lat: this.selectedLocation.lat(),
              lng: this.selectedLocation.lng(),
            }
          }
        ]
      }

      if (this.station && this.station.position && this.station.position.lat && this.station.position.lng) {
        return [
          {
            position: {
              lat: this.station.position.lat,
              lng: this.station.position.lng,
            }
          }
        ]
      }

      return []
    },
  },

    
  watch: {
    selectedPlace (place) {
      // Every time a place is changed, we fit the map's bounds
      // according to the place.

      if (place) {
        let bounds = new this.google.maps.LatLngBounds()  
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
        this.map.fitBounds(bounds)
      } else {
        this.resetMap()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.station-register-location-chooser {
  &__autocomplete {
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;

    @include tablet {
      flex-direction: row;
    }
  }

  &__autocomplete-actions {
    margin-top: .5em;

    @include tablet {
      margin-top: 0;
    }

    .button {
      &:not(:last-child) {
        margin-right: .5em;
      }
    }
  }

  &__autocomplete-input {
    max-width: 400px;
    margin-right: .5em;
  }

   &__map-section {
    position: relative;
    height: 870px;
    overflow: hidden;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  &__instructions {
    max-width: 665px;
  }
}
</style>
