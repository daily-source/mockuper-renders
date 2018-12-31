<template>
  <div 
    :class="['counter-widget', {'counter-widget--edit': edit}, `counter-widget--${size}`]"
    :style='{width: `${sizes[size].width}px`}'  
  >
    <div class="counter-widget__message-container" v-if='showMessage || edit'>
      <inline-editable-field 
        :value='message'
        v-model='message'
      />
    </div>
    <div class="counter-widget__title-container" v-if='!edit && !showMessage'>
      <h2 class="counter-widget__title">
        {{ counter.title }}
      </h2>
    </div>
    <div class="counter-widget__details is-flex ">
      <div class="counter-widget__counters">
        <div class="counter-widget__title-container" v-if='edit'>
          <inline-editable-field 
            :value='title'
            v-model='title'
          />
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>Today: </span>
          <span class='counter-widget-counter__value'>{{ getDeaths('day') | numberFormat}} </span>
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>This week: </span>
          <span class='counter-widget-counter__value'>{{ getDeaths('week') | numberFormat }} </span>
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>This year: </span>
          <span class='counter-widget-counter__value'>{{ getDeaths('year') | numberFormat }}  </span>
        </div>
        <div class="counter-widget__counter counter-widget__date-wrap">
          <span class='counter-widget-counter__date'>{{ timeNow }}</span>
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
import * as moment from 'moment'

import imageSrc from '@/util/imageSrc'
import Icons from '@/components/general/Icons' 
import InlineEditableField from './InlineEditableField'

export default {
  name: 'CounterWidget',

  components: {
    Icons,
    InlineEditableField,
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
			default: () => {
				return {}
			}
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

  mixins: [imageSrc],

  data () {
    return {
      imgFolderName: 'widget-imgs/',
      timeNow: '',
      workingDate: new Date
    }
  },

  mounted () {
    let now = new Date()
    this.timeNow = this.getTimeNow()

    this.updateTime()
  },

  methods: {
    updateTime () {
      setTimeout(() => {
        this.timeNow = this.getTimeNow()
        this.updateTime()
      }, 1000)
    },

    getTimeNow () {
      return moment().format('MMMM DD, YYYY hh:mm:ss A') 
    },

    getTimeDifference (timeA, timeB, unit='seconds') {
      timeA = moment(new Date(timeA))
      timeB = moment(new Date(timeB))
      return timeA.diff(timeB, unit)
    },

    getDeaths (span) {
      const diff = this.getTimeDifference(this.timeNow, moment(this.workingDate).startOf(span))
			const remainder = diff % this.widget.rate

			let val

			if (remainder === 0) {
				val = diff / this.widget.rate
			} else {
				val = (diff - remainder) / this.widget.rate
			}

			return val
    },
  },

  computed: {
    message: {
      get () {
        if(this.widget && this.widget.message) {
          return this.widget.message
        }

        return 'Choose a short message for your own personal widget'
      },

      set (value) {
        this.widget.message = value
        return value
      }
    },

    title: {
      get () {
        if(this.widget && this.widget.title) {
          return this.widget.title
        } else if (this.counter) {
          return this.counter.title
        }

        return 'Name your widget'
      },

      set (value) {
        this.widget.title = value
        return value
      }
    },
    
    size () {
      if (this.editData && this.editData.size) {
        return this.editData.size
      } else if (this.widget.size) {
        return this.widget.size
      } else {
        return 'large'
      }
    },

    ...mapState({
      widget (state) {
        const widget = state.counterwidgets.widgets.find(widget => parseInt(widget.id) === parseInt(this.id))
        return widget
      },

      featuredImg (state) {
        let img = state.counterwidgets.imgs[this.widget.featuredImg]
        if(this.edit && this.editData && this.editData.img !== null) {
          img = state.counterwidgets.imgs[this.editData.img]
        }
        return img
      },

      counter (state) {
        const counter = state.counterwidgets.counters.find(counter => parseInt(this.widget.counterId) === parseInt(counter.id))

        return counter
      },

      sizes: state => state.counterwidgets.sizes,
    })
  },
}
</script>

<style lang='scss'>
  .counter-widget {
    color: #fff;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .counter-widget__title,
  .counter-widget__message {
    color: inherit;
    font-size: 1.375rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .counter-widget__message-container,
  .counter-widget__title-container {
    font-family: $headings-font-family;
    font-size: 1.375rem;
    font-weight: 800;
    text-align: center;
    text-transform: uppercase;
  }

  .counter-widget__title-container {
    text-align: left;
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
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }

  .counter-widget-details__image {
    margin-bottom: 1rem;
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

  .counter-widget__editable-field {
    position: relative;

    .button.counter-widget__edit-button {
      position: absolute;
      top: -10px;
      right: -1rem;
      border-radius: 100%;
      box-shadow: 0 2px 16px 2px rgba(0,0,0,.2) !important
    }
  }

  .counter-widget__title-container {
    .counter-widget__edit-button {
      right: 0;
      top: 0;
    }
  } 
</style>

<style lang='scss'>
  .counter-widget__message-container,
  .counter-widget__title-container {
    .editable__field-input {
      text-tranform: uppercase;
      text-transform: uppercase;
      font-weight: 800;
      text-tranform: uppercase;
    }
  }

  .counter-widget__title-container {
    .button.edit-button {
      top: 0;
      right: .5rem;
    }
  }

  
  .counter-widget__title,
  .counter-widget__message {
    color: inherit;
    font-weight: 800;
    text-transform: uppercase;
  }


  .counter-widget--large {
    .counter-widget__details {
      flex-direction: row;
    }

    .counter-widget__counters {
      flex-basis: 65%;
      flex-shrink: 0;
      flex-grow: 1;
      max-width: 65%;
      margin-right: 3rem;
      margin-bottom: 0;
    }

    
    .counter-widget__title,
    .counter-widget__message {
      font-size: 1.375rem;
    }
  }

  .counter-widget__details {
    flex-direction: column;

    .counter-widget__counters {
      margin-bottom: 1em;
    }

    .counter-widget__title,
    .counter-widget__message {
      font-size: 1.125rem;
    }
  }
</style>
