<template>
  <div class="widget-customizer">
    <div class="widget-customizer__widget-container">
      <counter-widget-editor 
        :widget-id='widgetId'
        :theme='selectedTheme'
        :widget-data='widgetData'
      />
    </div>
    <div class="widget-customizer__images">
      <div class="columns is-mobile">
        <div class="widget-customizer__fields column">
          <!-- TODO: Handle form submit. -->
          <form @submit.prevent='() => false'>
            <div class="widget-customizer__featured-images-wrapper">
              <p class='has-text-weight-bold widget-customizer__fields-label'>Choose an image you would like to use: </p>
              <featured-image-chooser 
                :counter-id='widget.counterId'
                @change='setSelectedTheme'
              />
            </div>
            <div class="field">
              <label class='widget-customizer__fields-label'>Customize your title: </label>
              <counter-select 
                :counter-id='widget.counterId'
                v-model='counterId'
              />
            </div>
            <div class='field'>
              <label class='widget-customizer__fields-label' for='message'>Add a custom message(optional):</label>
              <input 
                type='text' 
                class='input'
                placeholder='Type a message here and it will show in the widget'
                id='message'
                :maxlength="55"
                v-model='message'
              >
            </div>
            <div class="field">
              <label class='widget-customizer__fields-label'>Choose a nonprofit that your widget will generate donations for: </label>
              <nonprofit-ajax-search 
                :placeholder='"Type a nonprofit to search..."'
                @selected='setNonprofit'
              />
            </div>
            <div class="field">
              <label class='widget-customizer__field-label' for="size">Size: </label>
              <div class="control">
                <div class="select is-block">
                  <select name="size" id="size" v-model='size'>
                    <option v-for='(size, index) in sizes' :key='index' :value="index">
                      {{ size.label + ' (' + size.width + 'px)' }}
                    </option>
                  </select>
                </div>
              </div>
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

import CounterWidgetEditor from '@/components/CountersForThePoor/CounterWidgetEditor'
import CounterSelect from '@/components/CountersForThePoor/CounterSelect'
import FeaturedImageChooser from '@/components/CountersForThePoor/FeaturedImageChooser'
import NonprofitAjaxSearch from '@/components/general/NonprofitAjaxSearch'

export default {
  name: 'WidgetCustomizer',

  props: {
    widgetId: {
      type: Number,
      required: true,
    },
  },

  components: {
    CounterWidgetEditor,
    CounterSelect,
    FeaturedImageChooser,
    NonprofitAjaxSearch,
  },

  data () {
    return {
      noImage: false,   
      size: 'large',
      color: 'black-and-white',
      nonprofit: null,
      counterId: 0,
      message: '',
      selectedTheme: {
        backgroundImageId: null,
        colorId: 1,
      },
    }
  },

  methods: {
    setSelectedTheme (theme) {
      if (theme.backgroundImageId === null) {
        this.noImage = true
      } else {
        this.noImage = false
      }

      this.selectedTheme = theme
    },

    setNonprofit (value) {
      this.nonprofit = value
    }
  },

  computed: {
    widgetData () {
      const { counterId, message, nonprofit } = this
      return {
        counterId,
        message,
        nonprofit,
      }
    },

    ...mapState({
      widget (state) {
        return state.counterwidgets.widgets.find(widget => widget.id == this.widgetId)
      },
      sizes: state => state.counterwidgets.sizes,
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
		background-color: #fff;
		box-shadow: 0 2px 8px 2px rgba(0,0,0,.3);
    padding: 1.5rem;
    border: 2px solid $color-gray;
    border-radius: $border-radius;
  }

  .widget-customizer__fields {
    display: flex;
    flex-wrap: wrap;

    form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .field {
      width: 100%;
      margin-top: 1em;
    }

    &-label {
      display: block;
      font-weight: 700 !important;
      margin-bottom: .5em;
    }

    .button-container {
      width: 100%;
      margin-top: auto;
    }

    .select {
      display: block;
      max-width: 100%;
    }
  }

  .nonprofit-search-field-wrapper {
    margin-left: -.75rem;
    margin-right: -.75rem;
    padding-top: 0;
    padding-bottom: 0;
  }

  .widget-customizer__images {
    margin-top: 1em;
  }
</style>
