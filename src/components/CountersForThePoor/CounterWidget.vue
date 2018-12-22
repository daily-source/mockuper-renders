<template>
  <div class="counter-widget">
    <h2 class='counter-widget__title'>
      {{ widget && widget.title }}
    </h2>
    <div class="counter-widget__details is-flex">
      <div class="counter-widget__counters">
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
        <router-link to='/' class='button is-primary counter-widget__button'>
          Help Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CounterWidget',

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
    }
  },

  computed: {    
    ...mapState({
      widget (state) {
        const widget = state.counterwidgets.widgets.find(widget => widget.id === this.id)
        return widget
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

  .counter-widget__title {
    color: inherit;
    font-size: 1.375rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .counter-widget__counters {
    flex-basis: 60%;
    flex-shrink: 0;
    flex-grow: 1;
    max-width: 60%;
    margin-right: 2rem;
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
</style>
