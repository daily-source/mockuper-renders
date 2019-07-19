<template>
  <div class="general-map">
    <div class="general-map__vr-map">
      <virtual-railroad-map 
        :users='users'	 
				:nonprofits='nonprofits'
				:markers='mapMarkers'
				:zoom='initialZoom'
				:icon-size='26'
        :stations='stations'
				@mapReady='onMapReady'
        v-bind='mapOptions'
				ref='virtual-railroad-map'
      />
    </div>
    <general-info 
      :opened='alertOpened'    
    />
    <map-actions 
      class='general-map__actions'
      :theme='mapOptions.theme'
      @switch-theme-clicked='switchTheme'
    />
    <map-legends 
      :opened='legendsOpened'
      @toggle='legendsOpened = !legendsOpened'
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import userGeolocation from '@/util/userGeolocation'

import MapActions from 'LocalComponents/General/MapActions'
import MapLegends from 'LocalComponents/MapLegends'
import GeneralInfo from 'LocalComponents/General/GeneralInfo'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

export default {
  name: 'GeneralMap',

  props: {
    showUserLocationMarker: { 
      type: Boolean,
      required: false,
      default: false,
    },

    stations: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },

    markers: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },

    mapOptions: {
      type: Object,
      required: false,
      default: () => {
        return {
          theme: "dark"
        }
      }
    },
  },

	mixins: [userGeolocation],

  components: {
    MapActions,
    MapLegends,
    VirtualRailroadMap,
    GeneralInfo,
  },

  data () {
    return {
      alertOpened: true,
      legendsOpened: false,
    }
  },

  mounted () {
    if (this.showUserLocationMarker) {
      this.startCallToActionTimer()
    }
  },

  methods: {
    /** 
		 * Start the timer to show the call to action
		 */
		startCallToActionTimer () {
			setTimeout(() => {
				this.showCallToAction = true
				this.getUserLocation() 
			}, 3000)
    },
    
    /**
		 * Triggers when the virtual railroad map is ready.
		 */
		onMapReady (map, google, vmap) {
			this.google = google
			this.map = map

			this.featuredUsers.forEach( user => {
				this.$refs['virtual-railroad-map'].addSelectedUser(user)
      })
      
      this.setZoom()

      window.addEventListener('resize', this.setZoom)

      this.$emit('map:ready', map, google)

      setTimeout(() => {
				this.featuredUsers.forEach(async user => {
          vmap.animatePolylines(user)
        })
			}, 100)
    },
    
    /**
		 * Fits the whole world into the Google Map, which depends on the size of
		 * the screen.
		 */
		setZoom () {
      const width = window.innerWidth

      console.log(width)
      
      if (width > 768) {
        const zoom = Math.ceil(Math.log2(width) - 8)
      
        if (this.map.zoom <= zoom) {
          this.map.setZoom(zoom)
        }
      } else {
        this.map.setZoom(2)
      }
    },
    
    switchTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  },

  computed: {
    /** 
		 * Custom markers to display on the map
		 */
		mapMarkers () {
			if (this.userLocation) {
        
        if (this.userLocation.coords && this.userLocation.coords.latitude &&  this.userLocation.coords.longitude) {
          const userMarker = {
            position: {
              lat: this.userLocation.coords.latitude,
              lng: this.userLocation.coords.longitude,
            }
          }
          this.markers.push(userMarker)
        }
			}

			return this.markers
		},
    /**
		 * Initial zoom of the map
		 */
		initialZoom () {
			const width = window.innerWidth

			return Math.ceil(Math.log2(width) - 8)
    },
    
    ...mapState({
			users: state => state.users.data,
			nonprofits: state => state.nonprofits.data,
    }),
    
		...mapGetters({
			featuredUsers: 'users/getFeaturedUsers',
		}),
  },
}
</script>

<style lang='scss' scoped>
.general-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  
  &__actions {
    position: absolute;
    top: 28%;
    right: 2%;
    z-index: 2;

    @include tablet {
      top: 10%;
    }
  }
}
</style>

