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
      this.$emit('change', value)
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

    featuredImgs () {
      return this.counter.imgPreviews
    },

    ...mapState({
      counter (state) {
        return state.counterwidgets.counters.find(counter => counter.id == this.counterId)
      },
    })
  },
}
</script>
