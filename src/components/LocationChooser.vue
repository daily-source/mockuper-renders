<template>
  <div class='location-chooser' slot='content'>
    <div class='location-chooser-autocomplete'>
      <gmap-autocomplete
        @place_changed="setSelectedPlaceTemp"
        placeholder='Enter zip code, city/state or city/country'
        class='location-chooser-autocomplete__input input'
      />
      <button 
        class='button is-primary'
        @click.prevent.stop='setSelectedPlace()'
      >
        Search
      </button>
      <button 
        class='button is-primary'
        :disabled='!selectedLocation || !selectedPlace'
        @click.prevent.stop='submitLocation'
      >
        Add This Location
      </button>
    </div>
    <div class='location-chooser__map-container'>
      <transition name='loading-fade'>
        <div 
          class='location-chooser__loader'
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
        class='location-chooser-map'
        @mapReady='onMapReady'
        @mapClicked='onMapClicked'
      >
        <gmap-marker 
          :position='selectedLocation'
        />
      </google-map>
      <div class="actions">
        <button
          class='button is-info actions__button'
          @click.prevent.stop='onSwitchThemeClicked()'
        >
          <icon-night-mode 
            :width='33.42'
            :height='33.42'
            v-if='mapStyle === "light"'
          />
          <icon-light-mode 
            :width='33.42'
            :height='33.42'
            v-if='mapStyle === "dark"'
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import userGeolocation from '@/util/userGeolocation'
import geocoder from '@/util/geocoder'

import GoogleMap from 'LocalComponents/GoogleMap'
import IconNightMode from 'LocalComponents/Icons/IconNightMode'
import IconLightMode from 'LocalComponents/Icons/IconLightMode'
import Loader from 'Components/Shared/Loader'

export default {
  name: 'LocationChooser',

  mixins: [userGeolocation],
  
  components: {
    GoogleMap,
    Loader,
    IconNightMode,
    IconLightMode,
  },

  props: {
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
     * Sets the selectedPlace to the temporarily stored variable.
     * 
     * @param {Object} place
     */
    setSelectedPlace (place = this.selectedPlaceTemp) {
      console.log(place)
      this.selectedPlace = place

      this.setSelectedLocation(place.geometry.location)
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

    onSwitchThemeClicked () {
      const style = this.mapStyle === 'light' ? 'dark' : 'light'
      
      this.changeMapStyle(style)
    },

    /**
     * Submits the location
     */
    submitLocation () {
      this.$emit('placeChanged', this.selectedPlace, this.selectedLocation)
    },

    ...mapActions({
      changeMapStyle: 'map/changeMapStyle',
    }),
  },

  watch: {
    selectedPlace (place) {
      // Every time a place is changed, we fit the map's bounds
      // according to the place.
      let bounds = new this.google.maps.LatLngBounds()

      if (place) {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      }

      this.map.fitBounds(bounds)
    },
  },

  computed: {
    ...mapState({
      mapStyle: state => state.map.mapStyle
    })
  }
}
</script>

<style lang="scss" scoped>
.location-chooser {
  &__map-container {
    height: 500px;
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

.location-chooser-map {
  position: absolute;
  height: 100%;
  width: 100%;
}

.location-chooser-autocomplete {
  margin-bottom: 1em;
  display: flex;

  &__input {
    max-width: 400px;
    margin-right: .5em;
  }

  .button {
    margin-right: .5em;
  }
}

.location-chooser-actions {
  text-align: right;
  margin-top: 1em;
  &__button {
    &:not(:last-child) {
      margin-right: .5em;
    }
  }
}

.actions {
  margin-top: 1em;
  padding-top: .5em;
  padding-left: .5em;
  &__button {
    background-color: transparent !important;
    padding: 0;
    outline: none !important;
    box-shadow: none !important;
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
