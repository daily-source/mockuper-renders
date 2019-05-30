<template>
  <GmapMap
    class='map'
    :center='center'
    :zoom='zoom'
    :mapTypeId='mapTypeId'
    @click='onMapClicked'
    @dragend='onDragEnd'
    :options='google && mapOptions'
    ref='gmap'
  >
    <slot></slot>
  </GmapMap>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

import mapStyles from '@/mapStyles'
import { mapState } from 'vuex';

export default {
  name: 'GoogleMap',

  props: {
    center: {
      type: Object,
      required: false,
      default: () => {
        return { lat:39.04115302042768, lng: 2.008774238974298 }
      }
    },

    zoom: {
      type: Number,
      required: false,
      default: 2,
    },

    /**
     * Specifies if the map controls are to be shown
     */
    showMapControls: {
      type: Boolean,
      required: false,
      default: true,
    }
  },

  data () {
    return {
      darkMapTypeId: 'virtual-railroad-dark',
      lightMapTypeId: 'virtual-railroad-light',
      map: null,
    }
  },

  mounted () {
    this.$refs.gmap.$mapPromise.then((map) => {
      // Store the map instance so that it can be accessible to
      // the whole component and probably other components
      // instantiating this component.
      this.map = map
			this.map.mapTypes.set(this.lightMapTypeId, this.lightMapType)
			this.map.mapTypes.set(this.darkMapTypeId, this.darkMapType)
			this.$emit('mapReady', this.map, this.google)
		})
  },

  methods: {
    /**
     * Handles event when map is clicked
     */
    onMapClicked (event) {
      this.$emit('mapClicked', event, this.map, this.$refs.gmap)
    },

    onDragEnd () {
      const position = this.map.getCenter();
      // console.log(`Lat: ${position.lat()}, Lng: ${position.lng()}`);
    },
  },

  computed: {
    /**
     * The Google map API instance.
     *
     * We need this in order to access the google object on our code.
     */
    google: gmapApi,

    /** 
	   * The Custom Map Type
		 */
		darkMapType() {
			return new this.google.maps.StyledMapType(mapStyles, {name: 'DARK'})
    },

    lightMapType() {
			return new this.google.maps.StyledMapType({}, {name: 'LIGHT'})
    },

    ...mapState({
      mapStyle: state => state.map.mapStyle,
    }),
    
    /** 
		 * Google Map options.
	   *
		 * TODO: Make options as a prop and then compute the mapoptions using default.
		 */
		mapOptions () {
      console.log(google.maps.ControlPosition.RIGHT_CENTER)
			return {
				mapTypeControl: false,
				panControl: false,
        streetViewControl: false,
        fullscreenControl: false,
				zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          // position: google.maps.ControlPosition.RIGHT_CENTER,
				}
			}
    },
    
    mapTypeId () {
      return this.mapStyle === 'light' ? this.lightMapTypeId : this.darkMapTypeId
    },
  },

}
</script>
