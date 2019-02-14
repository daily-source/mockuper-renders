<template>
  <GmapMap
    class='map'
    :center='{lat: 48.99156672710446, lng: -4.6210937499999805}'
    :zoom='zoom'
    :mapTypeId='mapTypeId'
    @click='onMapClicked'
    :options='google && mapOptions'
    ref='gmap'
  >
    <slot></slot>
  </GmapMap>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

import mapStyles from '@/mapStyles'

export default {
  name: 'GoogleMap',

  props: {
    center: {
      type: Object,
      required: false,
      default: () => {
        return { lat: 32.33888927939217, lng: 6.1015625 }
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
      mapTypeId: 'virtual-railroad',
      map: null,
    }
  },

  mounted () {
    this.$refs.gmap.$mapPromise.then((map) => {
      // Store the map instance so that it can be accessible to
      // the whole component and probably other components
      // instantiating this component.
      this.map = map
			this.map.mapTypes.set(this.mapTypeId, this.customMapType)
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
		customMapType() {
			return new this.google.maps.StyledMapType(mapStyles, {name: 'DARK'})
    },
    
    // /** 
		//  * Custom Map Control options
		//  */
		// mapTypeControlOptions() {
    //   if (this.showMapControls) {
    //     return {
    //       mapTypeIds: [
    //         this.google.maps.MapTypeId.ROADMAP,
    //         this.google.maps.MapTypeId.HYBRID,
    //         this.mapTypeId,
    //       ]
    //     }
    //   }
      
    //   return null
    // },
    
    /** 
		 * Google Map options.
	   *
		 * TODO: Make options as a prop and then compute the mapoptions using default.
		 */
		mapOptions () {
			return {
				mapTypeControl: false,
				panControl: false,
        streetViewControl: false,
        fullscreenControl: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL,
				}
			}
		},
  },
}
</script>
