<template>
  <div class='featured-image-chooser__wrapper'>
    <component 
      :is='component'
      :images='featuredImgs'
      @change='handleImageChange'
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FeaturedImageChooser',

  props: {
    type: {
      type: String,
      default: 'columns',
      validator: (value) => {
        return ['slider', 'columns'].indexOf(value) !== -1
      },
    },

    counterId: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      component: null,
      selectedIndex: null,
    }
  },

  mounted () {
    this.loader()
  },

  methods: {
    loader () {
      try {
        this.component = () => import(`./${this.componentName}`)
      } catch (err) {
        console.log(err)
        return
      }
    },

    handleImageChange (value) {
      this.selectedIndex = value
      this.$emit('change', this.theme)
    }
  },

  computed: {
    componentName () {
      let componentName 
      switch (this.type) {
        case 'slider':
          componentName = 'FeaturedImageChooserSlider'
          break;
        default:
          componentName = 'FeaturedImageChooserColumns'
      }

      return componentName
    },

    // TODO: Currently, we do not allow a background image to have multiple color themes.
    // Instead, we just find the first found theme. If we allow this in the future, we use
    // filter instead of find.
    theme () {
      const theme = this.counter.themes.find(theme => theme.backgroundImageId == this.selectedIndex)

      return theme || {
        backgroundImageId: null,
        colorId: 0,
      }
    },

    ...mapState({
      counter (state) {
        return state.counterwidgets.counters.find(counter => counter.id == this.counterId)
      },

      featuredImgs (state) {
        return state.counterwidgets.backgroundImages
      },

      colors (state) {
        return state.counterwidgets.colors
      }
    })
  },
}
</script>
