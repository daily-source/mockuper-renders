<template>
	<div class='feature-image-choose-wrapper'>
		<flickity
			class='featured-image-chooser'
			:options='sliderOptions'
			@init='flickityInitialized'
		>
			<div 
				class="featured-image-chooser__slide"
				v-for='(image, index) in images'
				@click='selectSlide(index)'
				:key='index'
			>
				<img 
					:src="getImageSrc(image)"
					class='featured-image-chooser__img'
					alt="Featured Image Chooser"
				>
				<div class='featured-image-chooser__slide-overlay'>
					<button class='button is-large is-uppercase is-primary has-text-weight-bold'>
						Preview Banner
					</button>
				</div>
			</div>
		</flickity>
	</div>
</template>

<script>
import imageSrc from '@/util/imageSrc'
import Flickity from '@/components/plugins/Flickity'

export default {
  name: 'FeaturedImageChooser',

  components: {
    Flickity,
  },

  mixins: [imageSrc],

  props: {
    images: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

	data () {
		return {
			flickity: null,
			selected: 0,
		}
	},

  methods: {
  	flickityInitialized (flickity) {
			if (flickity) {
				this.flickity = flickity
				this.flickity.on('change', this.sliderChanged)
			}
		},
		
		sliderChanged (index) {
			this.$emit('change', index, this.flickity)
		},

		selectSlide (index) {
			if (this.flickity) {
				this.flickity.select(index)
			}
		},
	},

  computed: {
    sliderOptions () {
      return {
        wrapAround: true,
        cellAlign: 'center',
				draggable: false,
      }
    }
  },
}
</script>

<style lang="scss">
  .featured-image-chooser {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;

    &__slide {
      height: 400px;
      width: 66%;
      margin-right: 10px;
      display: flex;
      align-items: center;

      &.is-selected {
         .featured-image-chooser__img {
           filter: brightness(1);
         }

				 &:hover {
					.featured-image-chooser__slide-overlay {
						opacity: 1;	
					} 
				}
      }
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(.5);
      transition: all .2s ease;
    }

		&__slide-overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(0,0,0,.6);
			opacity: 0;
			transition: opacity .5s ease;
		}
	}
</style>
