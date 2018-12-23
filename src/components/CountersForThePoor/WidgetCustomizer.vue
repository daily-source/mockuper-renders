<template>
  <div class="widget-customizer">
    <div class="widget">
      <counter-widget 
        :edit='true'
        :id="id"
        :edit-data='editData'
      />
    </div>
    <div class="widget-customizer__images">
      <div class="columns is-mobile">
        <div class="column is-7">
          <div class="widget-customizer-images__heading is-flex">
            <p>Choose an image you would like to use: </p>
            <p>
              <button class='button is-text no-image-button is-clear is-paddingless'>No Image</button>
            </p>
          </div>
          <div class="widget-customizer-images__columns columns">
            <div class="column widget-customizer-image__column" v-for='(img, index) in imgs' :key='`widget-img-${index}`'>
              <div 
                :class="[
                  'widget-customizer-image__container', 
                  {
                    'widget-customizer-image__container--is-selected': index === getSelectedImg() 
                  }
                ]"
              >
                <img  
                  :src='getImageSrc(img)'
                  :alt="`widget-image-${index}`"
                  @click='setSelectedImg(index)'
                >
              </div>
            </div>
          </div>
          <div class="field">
            <label>Choose a nonprofit for your widget to donate towards: </label>
            <nonprofit-ajax-seach 
              :placeholder='"Search"'
            />
          </div>
        </div>
        <div class="widget-customizer__fields column">
          <form action="#">
            <div class="field">
              <label for="size" class='label'>Size: </label>
              <div class="control">
                <div class="select">
                  <select name="size" id="size" v-model='size'>
                    <option v-for='(size, index) in sizes' :key='index' :value="index">
                      {{ size.label + ' (' + size.width + 'px)' }}
                    </option>
                  </select>
                </div>
                <small>To view all sizes, click <a href="#">here</a></small>
              </div>
            </div>
            <div class="field">
              <label for="color" class='label'>Color: </label>
              <div class="control">
                <div class="select">
                  <select name="color" id="color" v-model='color'>
                    <option v-for='(color, index) in colors' :key='index' :value="index">
                      {{ color.label }}
                    </option>
                  </select>
                </div>
              </div>
              <small><a href="#">Choose custom colors</a></small>
            </div>
            <div class="button-container has-text-right">
              <button class='button is-primary is-large is-uppercase has-text-weight-bold' type='submit'>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from '@/util/imageSrc'
import CounterWidget from '@/components/CountersForThePoor/CounterWidget' 
import NonprofitAjaxSeach from '@/components/general/NonprofitAjaxSearch'

export default {
  name: 'WidgetCustomizer',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  mixins: [imageSrc],

  components: {
    CounterWidget,
    NonprofitAjaxSeach,
  },

  data () {
    return {
      imgFolderName: 'widget-imgs/',
      title: '',
      selectedImg: null,
      noImage: false,   
      size: 'large',
      color: 'black-and-white',
    }
  },

  methods: {
    setSelectedImg (index) {
      this.selectedImg = index
    },

    getSelectedImg() {
      if(!this.noImage) {
        if(this.selectedImg) {
          return this.selectedImg
        } else {
          return this.widgetFeaturedImg
        }
      }

      return false
    }
  },

  computed: {
    editData () {
      return {
        img: this.selectedImg ? this.selectedImg : this.widgetFeaturedImg,
        title: this.title,
        message: this.message,
        size: this.size,
        color: this.color,
      }
    },
    ...mapState({
      imgs: state => state.counterwidgets.imgs,
      sizes: state => state.counterwidgets.sizes,
      colors: state => state.counterwidgets.colors,
      widgetFeaturedImg (state) {
        const widget = state.counterwidgets.widgets.find(widget => widget.id === this.id)
        return widget.featuredImg
      },
    }),
  },
}
</script>

<style scoped lang='scss'>
  .widget {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
  }

  .counter-widget {
    color: #333;
    padding: 1.5rem;
    border: 2px solid $color-gray;
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

  .widget-customizer-image__column {
    display: flex;
  }

  .widget-customizer-image__container {
    border: 3px solid transparent;
    overflow: hidden;
    border-radius: $border-radius;
    transition: border .2s ease;

    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform .5s ease, filter .2s ease;
      filter: brightness(.5);
    }

    &--is-selected,
    &:hover {
      border-color: $primary;

      > img {
        transform: scale(1.03);
        filter: brightness(1);
      }
    }
  }

  .widget-customizer__fields {
    display: flex;
    flex-wrap: wrap;

    form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .button-container {
      width: 100%;
      margin-top: auto;
    }

    .field {
      width: 100%;
    }

    label {
      justify-content: flex-start;
      font-weight: 700 !important;
    }

    .select {
      display: block;
      max-width: 100%;
    }
  }
</style>
