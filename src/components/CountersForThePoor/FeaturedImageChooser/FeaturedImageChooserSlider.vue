<template>
	<div class='feature-image-chooser--slider'>
		<flickity
			class='featured-image-chooser__slider'
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
			</div>
			<div class='featured-image-chooser__slide featured-image-chooser__slide--no-img'>
				<p class='featured-image-chooser__no-img-text'>No image</p>
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
			imgFolderName: 'widget-imgs/',
		}
	},

  methods: {
  	flickityInitialized (flickity) {
			if (flickity) {
				this.flickity = flickity
				this.flickity.on('settle', this.sliderChanged)
			}
		},
		
		sliderChanged (index) {
			if (index === this.images.length) {
				index = null
			}
			this.selected = index
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
    margin-left: auto;
    margin-right: auto;

    &__slide {
      height: 400px;
      width: 66%;
      margin-right: 10px;
      display: flex;
			align-items: center;
			border-radius: $border-radius;
			overflow: hidden;

			&--no-img {
				background-color: #ddd;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			&:hover {
				cursor: pointer;
			}

			&.is-selected {
				border: 2px solid $primary;
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

		&__no-img-text {
			font-size: 2rem;
		}

		.flickity-prev-next-button {
			&.next {
				right: -3.25em;
			}

			&.previous {
				left: -3.25em;
			}
		}

		.flickity-button-icon {
			fill: #000;
		}
	}
</style>
