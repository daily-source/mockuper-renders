<template>
  <div class="widget-customizer">
    <div class="widget">
      <counter-widget 
        :edit='true'
        :id="'1'"
      />
    </div>
    <div class="widget-customizer__images">
      <div class="columns is-mobile">
        <div class="column is-7">
          <div class="widget-customizer-images__heading is-flex">
            <p>Choose an image you would like to use: </p>
            <p>
              <button class='button is-text no-image-button is-clear'>No Image</button>
            </p>
          </div>
          <div class="widget-customizer-images__columns columns">
            <div class="column" v-for='(img, index) in imgs' :key='`widget-img-${index}`'>
              <div class="widget-customizer-image__container">
                <img  
                  :src='getImageSrc(img)'
                  :alt="`widget-image-${index}`"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="column">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from '@/util/imageSrc'
import CounterWidget from '@/components/CountersForThePoor/CounterWidget' 

export default {
  name: 'WidgetCustomizer',

  mixins: [imageSrc],

  data () {
    return {
      imgFolderName: 'widget-imgs'
    }
  },

  components: {
    CounterWidget,
  },

  computed: {
    ...mapState({
      imgs: state => state.counterwidgets.imgs
    }),
  },
}
</script>

<style scoped lang='scss'>
  .widget {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
  }

  .counter-widget {
    color: #333;
    padding: 1.5rem;
    border: 1px solid $color-gray;
    border-radius: $border-radius;
  }

  .widget-customizer-images__heading {
    justify-content: space-between;
    align-items: center;
  }

  .no-image-button {
    padding: 0;
    color: $primary;
  }
</style>
