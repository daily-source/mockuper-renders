<template>
  <div class="station-map">
    <virtual-railroad-map 
      :users='users'	 
      :nonprofits='nonprofits'
      @mapReady='onMapReady'
      :zoom='initialZoom'
      :icon-size='32'
      :stations='[station]'
      :center='{lat: 27.620995834987486, lng: 2.008774238974298}'
      ref='virtual-railroad-map'
    />	
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

export default {
  name: 'StationMap',

  props: {
    station: {
      type: Object,
      required: true,
    }
  },

  components: {
    VirtualRailroadMap,
  },

  data () {
    return {
      google: null,
			map: null,
    }
  },

  methods: {
		/**
		 * Fits the whole world into the Google Map, which depends on the size of
		 * the screen.
		 */
		setZoom () {
			const width = window.innerWidth

			const zoom = Math.ceil(Math.log2(width) - 8)
		
			if (this.map.zoom <= zoom) {
				this.map.setZoom(zoom)
			}
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

      this.setZoom
      window.addEventListener('resize', this.setZoom)

      setTimeout(() => {
				this.featuredUsers.forEach(async user => {
          vmap.animatePolylines(user)
        })
			}, 100)
		},
  },

  computed: {
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
  }
}
</script>

<style lang='scss' scoped>
.station-map {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>

