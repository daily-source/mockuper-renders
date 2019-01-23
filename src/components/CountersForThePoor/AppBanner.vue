<template>
	<section 
		id="banner" 
		class='section banner'
		:style='{
			backgroundImage: `url("${backgroundImage}")`
		}'		
	>
		<div class="banner__contents">
			<counter-widget 
				:id="widgetId"
			/>
		</div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from '@/util/imageSrc'

import CounterWidget from '@/components/CountersForThePoor/CounterWidget'

export default {
	name: 'AppBanner',

	mixins: [imageSrc],

  props: {
    widgetId: {
      type: Number,
			default: 1,
    }
  },

  components: {
    CounterWidget,
	},

	data () {
		return {
			imgFolderName: 'widget-imgs/'
		}
	},

	computed: {
		backgroundImage () {
			const { backgroundImageId } = this.theme

			if (backgroundImageId !== null || backgroundImageId !== undefined) {
				const img = this.backgroundImages[backgroundImageId]

				return this.getImageSrc(img)
			}

			return
		},
		
		...mapState({
			widget (state) {
				return state.counterwidgets.widgets.find(widget => widget.id === parseInt(this.widgetId))
			},

			counter (state) {
				return state.counterwidgets.counters.find(counter => counter.id === parseInt(this.widget.counterId))
			},

			theme (state) {
				return state.counterwidgets.themes.find(theme => theme.id == this.widget.themeId)
			},

			backgroundImages: state => state.counterwidgets.backgroundImages
		})
	},
}
</script>

<style lang='scss'>
  .banner {
    position: relative;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 95vh;
    margin-bottom: 2rem;
  }

  .banner__img {
    display: block;
  }

  .banner__contents {
    position: absolute;
    left: 4em;
    bottom: 80px;

    .counter-widget {
			max-width: 600px;
      padding:  1.5rem 2rem;
      // background-color: rgba(#030000, .28);
      // border: 2px solid $primary;
      border-radius: 4px;
			margin-left: 0;
    }
  }
</style>
