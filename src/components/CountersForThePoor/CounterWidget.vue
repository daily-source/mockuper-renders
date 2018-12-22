<template>
  <div :class="['counter-widget', {'counter-widget--edit': edit}]">
    <h2 class='counter-widget__message' v-if='showMessage || edit'>
      {{ message }}
    </h2>
    <h2 class='counter-widget__title' v-if='!edit && !showMessage'>
      {{ widget && widget.title }}
    </h2>
    <div class="counter-widget__details is-flex  ">
      <div class="counter-widget__counters">
        <div class="counter-widget__title-container" v-if='edit'>
          <h2 class='counter-widget__title'>
            {{ widget && widget.title }}
          </h2>
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>Today: </span>
          <span class='counter-widget-counter__value'>1,900 </span>
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>This week: </span>
          <span class='counter-widget-counter__value'>1,900 </span>
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>This year: </span>
          <span class='counter-widget-counter__value'>1,900 </span>
        </div>
        <div class="counter-widget__counter counter-widget__date-wrap">
          <span class='counter-widget-counter__date'>July 29, 2014, 4:35:40 A.M E.T. </span>
        </div>
      </div>
      <div class="counter-widget__details-right is-flex">
        <div class="counter-widget-details__image" v-if='edit'>
          <img :src="getImageSrc(featuredImg)" alt="">
        </div>
        <router-link to='/' class='button is-primary counter-widget__button'>
          Help Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from '@/util/imageSrc'

export default {
  name: 'CounterWidget',

  mixins: [imageSrc],

  data () {
    return {
      imgFolderName: 'widget-imgs/'
    }
  },

  props: {
    edit: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      required: false,
    },

    editData: {
      type: Object,
      required: false,
    },

    noImage: {
      type: Boolean,
      required: false,
    },

    showMessage: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    message () {
      if(this.widget && this.widget.message) {
        console.log('here')
        return this.widget.message
      }

      return 'Choose a short message for your own personal widget'
    },
    ...mapState({
      widget (state) {
        const widget = state.counterwidgets.widgets.find(widget => widget.id === this.id)
        return widget
      },
      featuredImg (state) {
        let img = state.counterwidgets.imgs[this.widget.featuredImg]
        if(this.edit && this.editData && this.editData.img !== null) {
          img = state.counterwidgets.imgs[this.editData.img]
        }
        return img
      }
    })
  },
}
</script>

<style lang='scss'>
  .counter-widget {
    color: #fff;
    position: relative;
  }

  .counter-widget__title,
  .counter-widget__message {
    color: inherit;
    font-size: 1.375rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .counter-widget__message {
    font-size: 1.25rem;
    text-align: center;
  }

  .counter-widget__counters {
    flex-basis: 65%;
    flex-shrink: 0;
    flex-grow: 1;
    max-width: 65%;
    margin-right: 3rem;
  }

  .counter-widget__counter {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-left: .5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .counter-widget-counter__value {
    font-weight: 700;
    font-size: 1.25rem;
  }

  .counter-widget__button {
    padding: .5rem 1.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    align-self: flex-end;
  }

  .counter-widget__details-right {
    flex-wrap: wrap;
  }

  .counter-widget-details__image {
    > img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .counter-widget--edit {
    .counter-widget__details-right {
      justify-content: center;
    }
  }
</style>
