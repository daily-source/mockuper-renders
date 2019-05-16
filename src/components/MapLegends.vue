<template>
  <div 
    :class='["legends", {"legends--minimized": !opened}]'  
  >
    <div class='legends__container'>
      <div class='legends__content'>
        <div class='legend'>
          <img src='@/assets/img/light_bulb_32.png' alt='Light Bulb'>
          <p>
            <span class='has-text-weight-bold'>= people who help to free slaves.</span> &nbsp;Supporters of the Underground Railroad put lights on their barns at night to let runaway slaves know they were safe havens to sleep or find food and water. So we use light bulb icons for people who help to free slaves. 
          </p>
        </div>
        <div class='legend'>
          <img src='@/assets/img/star_32.png' alt='Star'>
          <p>
            <span class='has-text-weight-bold'>= nonprofit helping to free slaves.</span> &nbsp;Slaves escaping north to freedom relied on the North Star as a beacon and compass because it doesn't change its location. Today, slaves gaining freedom rely on nonprofits that are unwavering in their help, so we represent them with stars.
          </p>
        </div>
        <div class='legends__button-container'>
          <button 
            :class='["button legends__button", {"legends__button--opened": opened}]'
            @click='onToggleClick'
            v-tooltip.top-start='tooltipMessage'
          >
            <icon-chevron 
              :width='36'
              :height='36'
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconChevron from 'LocalComponents/Icons/IconChevron'

export default {
  name: 'MapLegends',

  components: {
    IconChevron,
  },

  props: {
    opened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    onToggleClick () {
      this.$emit('toggle')
    },
  },

  computed: {
    tooltipMessage () {
      if (this.opened) {
        return 'Click to hide map legend.'
      }

      return 'Click to open map legend.'
    },
  },
}
</script>

<style lang="scss" scoped>
.legends {
  background-color: rgba($primary, .9);
  padding: 1.25em 1em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: bottom .2s ease;

  &__content {
    display: flex;
    margin-left: -1em;
    margin-right: -1em;
  }

  &__container {
    max-width: 1420px;
    margin-left: auto;
    margin-right: auto;
  }

  &--minimized {
    bottom: -128px;
  }

  img {
    vertical-align: middle;
  }

  &__button-container {
    position: absolute;
    top: -16px;
    left: 0;
    right: 2%;
    padding-right: 1.5rem;
    text-align: right;
  }

  &__button {
    padding: 0;
    background-color: transparent;
    border: 0;
    transform: rotate(180deg);
    border-radius: 100%;
    border: 2px solid #323736;
    height: auto;
    transition: transform .2s ease;

    &--opened {
      transform: rotate(360deg);      
    }
  }
}

.legend {
  max-width: 50%;
  display: flex;
  align-items: flex-start;
  margin-top: 1em;
  padding-left: .1em;
  padding-right: .1em;

  img {
    margin-top: -.25em;
    flex: 1;
    max-width: 32px;
    flex-basis: 32px;
  }
  
  p {
    font-size: 18px;
    color: #fbfbfb;
    margin-bottom: 0;
    margin-left: 1.25em;
    flex: 1;
    max-width: 100%;

    span {
      display: inline-block;
      margin-left: -.875em;
    }
  }

  &:first-of-type {
    padding-right: 1rem;
  }
}
</style>
