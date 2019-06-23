<template>
	<div class='user-virtual-railroad-map'>
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
		<virtual-railroad-map
			ref='map'
			:users='[user]'
			:nonprofits='nonprofits'
			:iconSize='32'
			:show-user-popup-windows='false'
      :zoom='2'
			@mapReady='onMapReady'
		/>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'
import IconNightMode from 'LocalComponents/Icons/IconNightMode'
import IconLightMode from 'LocalComponents/Icons/IconLightMode'

export default {
	name: 'UserVirtualRailroadMap',

	props: {
		user: {
			type: Object,
			required: true,
		}
	},

	components: {
    VirtualRailroadMap,
    IconNightMode,
    IconLightMode,
  },
  
  data () {
    return {
      map: null,
      vmap: null,
    }
  },

	methods: {
		/**  
		 * Handles the `mapReady` event of the Virtual Railroad Map
		 */
		onMapReady (map, google, vmap) {
      this.vmap = vmap
			this.vmap.addSelectedUser(this.user)

			// Calling the function immediately here doesn't seem to work.
			// Tested $nextTick also but it seems it's still not working.
			// Seems like calling it after 100ms is working. 100ms is not really
			// that noticeable though.
      this.animatePolylines()
    },

    animatePolylines () {
      // TODO: Add a delay for this to smoothen the animation
      this.vmap.removeUser(this.user)
      
			this.vmap.addSelectedUser(this.user)

      setTimeout(() => {
				this.vmap.animatePolylines(this.user)
			}, 100)
    },
    
    onSwitchThemeClicked () {
      const style = this.mapStyle === 'light' ? 'dark' : 'light'
      
      this.changeMapStyle(style)
    },

    ...mapActions({
      changeMapStyle: 'map/changeMapStyle',
    }),
	},

	computed: {
		nonprofits () {
			const stateNonprofits = this.$store.state.nonprofits.data

			let foundNonprofits = []
			let isAlreadyAdded = []

			this.user.nonprofits.forEach(userNonprofitPair => {
				if (isAlreadyAdded.indexOf(userNonprofitPair.nonprofitId) === -1) {
					isAlreadyAdded.push(userNonprofitPair.nonprofitId)
					foundNonprofits.push(stateNonprofits.find(np => np.id === userNonprofitPair.nonprofitId))
				}
			})
			
			const nps = foundNonprofits.map(nonprofit => {
				const userNonprofits = this.user.nonprofits
				const nonprofitLocations = userNonprofits.filter(userNonprofitPair => userNonprofitPair.nonprofitId === nonprofit.id)
				const locationIDs = nonprofitLocations.map(npLoc => npLoc.locationId)

				const locations = nonprofit.locations.filter(loc => {
					return locationIDs.indexOf(loc.id) !== -1
				})

				return {
					...nonprofit,
					locations,
				}
			})

			return nps
    },
    
    ...mapState({
      mapStyle: state => state.map.mapStyle
    })
  },
  
  watch: {
    user () {
      this.animatePolylines()
    },
  },
}
</script>

<style lang="scss" scoped>
.user-virtual-railroad-map {
  position: relative;
  height: 580px;
  max-width: 1024px;
  margin-left: -15px;
  margin-right: -15px;

  @include tablet {
    margin-left: auto;
    margin-right: auto;
  }

  .actions {
    position: absolute;
    z-index: 10;
    top: 10%;
    right: 2%;
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
}
</style>
