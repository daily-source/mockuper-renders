<template>
<div class='income-level-slider'>
	<div class='income-level-slider-heading'>
		
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'

import Flickity from 'Components/plugins/Flickity'

export default {
	name: 'IncomeLevelSlider',

	components: {
		Flickity,
	},

	computed: {
		...mapState({
			incomeLevels (state) {
				return state.incomeLevels.data
			}
		})
	}
}
</script>

<style>

</style>
