<template>
  <div class='counter-widget-edit' :style='{width: `${size}px`}'>
    <counter-widget-jumbotron 
      :widget-id='widgetId'
      :bg-image='backgroundImg'
      :widget-position='["bottom", "left"]'
      :logo-position='theme.logoPosition'
      :show-logo='true'
      :colorId='theme.colorId'
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from '@/util/imageSrc'

import CounterWidgetJumbotron from '@/components/CountersForThePoor/CounterWidgetJumbotron'

export default {
  name: 'CounterWidgetEditor',

  components: {
    CounterWidgetJumbotron,
  },

  mixins: [imageSrc],

  data () {
    return {
      imgFolderName: 'widget-imgs/'
    }
  },

  props: {
    size: {
      type: Number,
      required: false,
      default: 800,
    },

    // TODO: Make required, remove default
    widgetId: {
      type: Number,
      required: false,       
      default: 1,
    },

    theme: {
      type: Object,
      required: false,
      default: () => {
        return {
          backgroundImageId: null,
          colorId: 0,
        }
      },
    },
  },

  computed: {
    backgroundImg () {
      const { backgroundImageId } = this.theme

      if (backgroundImageId || backgroundImageId === 0) {
        return this.getImageSrc(this.backgroundImages[backgroundImageId])
      }

      return null
    },

    ...mapState({
      widget (state) {
        return state.counterwidgets.widgets.find(widget => widget.id === this.widgetId)
      },

      counter (state) {
        return state.counterwidgets.counters.find(counter => counter.id === this.widget.counterId)
      },

      backgroundImages: state => state.counterwidgets.backgroundImages,
    }),
  },
}
</script>

<style lang="scss">
.counter-widget-edit {
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;

  .counter-widget {
    transform: scale(0.6);
    transform-origin: 0% 100%;
    background-color: transparent !important;
    border-color: transparent !important;
  }

  .counter-widget-jumbotron {
    height: 450px;
    max-height: 450px;

    &__logo-container {
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
    }

    &__img-container {
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
