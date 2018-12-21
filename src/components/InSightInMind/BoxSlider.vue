<template>
  <div 
    class="box-slider"
    @mouseover='toggleHovered'
    @mouseout='toggleHovered'
  >
    <flickity
      :options='sliderOptions'
    >
      <div class="box-slider__slide box-slider__slide--title">
        <h2 class='box-slider-title__heading'>{{ message }}</h2>
      </div>
      <div 
        class="box-slider__slide box-slider__slide--image" 
        v-for='(image, key) in images' 
        :key='generateImageKey(key)'
      >
        <img 
          :src='getImage(image.name)' 
          :alt="image.alt"
        >
      </div>
    </flickity>
    <transition name='box-fade'>
      <div 
      class="box-slider__hover-box-wrap"
      v-if='hovered'>
        <div class="box-slider__hover-box">
          <h3 class='has-text-weight-bold'>{{ title }}</h3>
          <p v-if='cost'>
            Approximate cost of saving a life: {{ cost | currencyFormat }}
          </p>
          <p>
            A person dies every {{ (deathsPerSecond || '????') | numberFormat  }} seconds
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Flickity from '@/components/plugins/Flickity'
import { random } from 'lodash'

export default {
  name: 'BoxSlider',

  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
    },
    deathsPerSecond: {
      type: Number,
    },
    images: {
      type: Array,
    },
    options: {
      type: Object,
      required: false,
    }
  },

  components: {
    Flickity,
  },

  data () {
    return {
      hovered: false, 
    }
  },

  methods: {
    toggleHovered () {
      this.hovered = !this.hovered
    },

    getImage(imgName) {
      return require(`@/assets/img/images/in-sight-in-mind/${imgName}`)
    },

    generateImageKey(key) {
      return `${(this.$options.filters.slugify(this.title))}-image-${key}`
    }
  },

  computed: {
    sliderOptions () {
      const autoplaySpeed = (this.deathsPerSecond || random(5, 20)) * 1000 

      return {
        draggable: false,
        prevNextButtons: false,
        pageDots: false, 
        autoPlay: autoplaySpeed,
        ...this.options,
      }
    },
  }
}
</script>

<style lang='scss'>
  .box-slider {
    border-radius: $box-slider-border-radius;
    text-align: center;
    height: $box-slider-height;
    position: relative;
  }

  .box-slider__slide {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $box-slider-height;
    border-radius: $box-slider-border-radius;
    overflow: hidden;
    background-image: linear-gradient(135deg, $primary 0%, $color-primary-tint 90%);

    img {
      width: 100%;
      height: 110%;
      object-fit: cover;
      display: block;
    }
  }

  .box-slider-title__heading {
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    font-weight: 700;
    font-size: 1.5em;
    font-family: $font-family-base;
    margin-bottom: 0;
  }

  .box-slider__hover-box {
    width: 100%;
    height: 100%;
    background-color: $secondary;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    color: #fff;
    padding: .875em;
    border-radius: $box-slider-border-radius;

    h3 {
      font-family: $font-family-base;
      color: #fff;
      font-size: 1.25rem;
    }

    p {
      font-size: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .box-slider__hover-box-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  // Fade animation
  .box-fade-enter,
  .box-fade-leave-to {
    opacity: 0;
  }

  .box-fade-enter-active,
  .box-fade-leave-active {
    transition: opacity .2s ease-out;
  }

  .box-fade-enter-to,
  .box-fade-enter-leave {
    opacity: 1;
  }

</style>
