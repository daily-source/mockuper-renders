<template>
	<div class='user-virtual-railroad-map'>
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
import { mapState } from 'vuex'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

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
	},

	methods: {
		/**  
		 * Handles the `mapReady` event of the Virtual Railroad Map
		 */
		onMapReady (map, google, vmap) {
			vmap.addSelectedUser(this.user)

			// Calling the function immediately here doesn't seem to work.
			// Tested $nextTick also but it seems it's still not working.
			// Seems like calling it after 100ms is working. 100ms is not really
			// that noticeable though.
			setTimeout(() => {
				vmap.animatePolylines(this.user)
			}, 100)
		},
	},

	computed: {
		...mapState({
			/**
			 * Get the nonprofits supported by the user
			 */
			nonprofits (state) {
				return this.user.nonprofits.map(userNonprofit => {
					const nonprofit = state.nonprofits.data.find(nonprofit => nonprofit.id == userNonprofit.nonprofitId)
					const location = nonprofit.locations.find(location => location.id === userNonprofit.locationId)

					return {
						...nonprofit,
						location,
					}
				})
			},
		})
	},
}
</script>

<style lang="scss" scoped>
.user-virtual-railroad-map {
  position: relative;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  height: 500px;
}
</style>
