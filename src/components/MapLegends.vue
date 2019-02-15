<template>
  <div 
    :class='["legends", {"legends--minimized": !opened}]'  
  >
    <div class='legends__container'>
      <div class='legends__content'>
        <p>
          <img src='@/assets/img/light_bulb_32.png' alt='Light Bulb'><span class='has-text-weight-bold'> = person helping to free slaves. </span> Individuals helping the Underground Railroad left lit lamps hanging on their barn doors and sheds overnight to let runaway slaves know they were safe havens where they could sleep or find food and water for their journey. They also used lamps to signal to runaway slaves who were preparing to cross rivers whether there was anyone on the other shore who would report them or try to capture them, or if the coast was clear to swim across.
        </p>
        <p>
          <img src='@/assets/img/star_32.png' alt='Star'><span class='has-text-weight-bold'> = nonprofit helping to free slaves.</span> In the 1800s, slaves trying to escape north to freedom regularly relied on the North star as a beacon and compass because it's the only star in the sky that doesn't change its location. Today, slaves rely on nonprofits to help them gain their freedom and the nonprofits are steadfast in their commitment to free slaves, so we represent them with stars.
        </p>
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
  padding: 1.5em 1em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: bottom .2s ease;

  &__content {
    display: flex;
  }

  &__container {
    max-width: 1330px;
    margin-left: auto;
    margin-right: auto;
  }

  &--minimized {
    bottom: -150px;
  }

  img {
    vertical-align: middle;
  }

  p {
    font-size: 14px;
    color: #fff;
    max-width: 50%;
    margin-bottom: 0;

    &:last-of-type {
      margin-left: .5em;
    }
  }

  &__button-container {
    position: absolute;
    top: -16px;
    left: 0;
    right: 0;
    text-align: center;
  }

  &__button {
    padding: 0;
    background-color: transparent;
    border: 0;
    transform: rotate(180deg);
    border-radius: 100%;
    border: 2px solid #000;
    height: auto;
    transition: transform .2s ease;

    &--opened {
      transform: rotate(360deg);      
    }
  }
}
</style>
