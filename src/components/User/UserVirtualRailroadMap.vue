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
          v-if='theme === "light"'
        />
        <icon-light-mode 
          :width='33.42'
          :height='33.42'
          v-if='theme === "dark"'
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
      :theme='theme'
			@mapReady='onMapReady'
		/>
    <transition name='loading-fade'>
      <div 
        class="user-virtual-railroad-map__loader"
        v-show='showLoadingOverlay'
      >
        <loader 
          :width='50'
          :height='50'
          color='#dedede'
          message='Updating map, please wait...'
        />
      </div>
    </transition>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'
import IconNightMode from 'LocalComponents/Icons/IconNightMode'
import IconLightMode from 'LocalComponents/Icons/IconLightMode'
import Loader from 'Components/Shared/Loader'

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
    Loader,
  },
  
  data () {
    return {
      map: null,
      vmap: null,
      showLoadingOverlay: false,
      theme: 'dark',
    }
  },

	methods: {
		/**  
		 * Handles the `mapReady` event of the Virtual Railroad Map
		 */
		onMapReady (map, google, vmap) {
      this.vmap = vmap

			// Calling the function immediately here doesn't seem to work.
			// Tested $nextTick also but it seems it's still not working.
			// Seems like calling it after 100ms is working. 100ms is not really
			// that noticeable though.
      this.animatePolylines()
    },

    animatePolylines () {
      this.showLoadingOverlay = true
      // TODO: Add a delay for this to smoothen the animation

      this.vmap.removeUser(this.user)

      setTimeout( () => {
        this.vmap.addSelectedUser(this.user)

        setTimeout(() => {
          this.vmap.animatePolylines(this.user)
        this.showLoadingOverlay = false
        }, 300)

      }, 100)
    },
    
    onSwitchThemeClicked () {
      this.theme = this.theme === 'light' ? 'dark' : 'light'   
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
    user: {
      deep: true,
      handler: 'animatePolylines'
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

  &__loader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
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
</style>
