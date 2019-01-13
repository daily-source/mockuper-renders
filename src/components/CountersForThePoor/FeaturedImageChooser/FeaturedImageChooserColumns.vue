<template>
  <div class='featured-image-chooser--columns columns'>
    <div 
      class='featured-image-chooser__column column'
      v-for='(image, index) in images'
      @click='handleColumnClicked(index)'
      :key='index'
    >
      <div 
        :class='["featured-image-chooser__img-container", {"featured-image-chooser__img-container--selected": selected === index}]'
      >
        <img 
          :src='getImageSrc(image)' 
          class='featured-image-chooser__img'
          :alt='`Featured Image #${index}`'
        >
      </div>
    </div>
    <div 
      class='featured-image-chooser__column featured-image-chooser__column--no-img column'
      @click='handleColumnClicked(null)'
    >
      <div 
        :class='["featured-image-chooser-no-img__text", {"featured-image-chooser-no-img__text--selected": selected == null}]'
      >
        No Image
      </div>
    </div>
  </div>
</template>

<script>
import imageSrc from '@/util/imageSrc'

export default {
  name: 'FeaturedImageChooserColumns',

  mixins: [imageSrc],

  props: {
    images: {
      type: Array,
      required: false,
    }
  },

  data () {
    return {
      imgFolderName: 'widget-imgs/thumbnails/',
      selected: null,
    }
  },

  methods: {
    handleColumnClicked (index) {
      this.selected = index
    }
  },

  watch: {
    selected () {
      this.$emit('change', this.selected)
    },
  }
}
</script>

<style lang="scss" scoped>
@mixin selected-effect ($color, $border-color: transparent, $border-color-selected: $primary) {
  border: 2px solid $border-color;
  border-radius: $border-radius;
  position: relative;
  transition: all .2s ease;
  overflow: hidden;
  transform: scale(1);

  &:before {
    content: '';
    background-color: $color;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 1;
    transition: all .2s ease;
    border-radius: $border-radius;
  }

  &--selected,
  &:hover {
    border-color: $border-color-selected;

    &:before {
      opacity: 0
    }
  }

  &--selected {
    transform: scale(1.05);
  }
}

.featured-image-chooser {
  &__column {
    cursor: pointer;
    display: flex;
    align-items: stretch;
  }

  &__img-container {
    width: 100%;
    height: 100%;

    @include selected-effect(rgba(0,0,0,.5))
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__column--no-img {
    display: flex;
    align-items: stretch;
  }

  &-no-img__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: $border-radius;
    border: 2px solid #dadada;
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #eee;

    @include selected-effect(rgba(0,0,0,.7), #dadada);
  }
}
</style>
