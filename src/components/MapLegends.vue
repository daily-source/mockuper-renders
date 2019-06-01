<template>
  <div 
    :class='["legends", {"legends--minimized": !opened}]'  
  >
    <div class='legends__container'>
      <div class='legends__content'>
        <div class='legend'>
          <img src='@/assets/img/light_bulb_29.png' alt='Light Bulb'>
          <div class="legends__text-wrapper">
            <p class="legends__text-equals has-text-weight-bold">
              =
            </p>
            <p class="legends__text">
              <span class="has-text-weight-bold">people who help to free slaves.</span> &nbsp;Supporters of the Underground Railroad put lights on their barns at night to let runaway slaves know they were safe havens to sleep or find food and water. So we represent people who help to free slaves with light bulbs.
            </p>
          </div>
        </div>
        <div class='legend'>
          <img src='@/assets/img/star_29.png' alt='Star'>
          <div class="legends__text-wrapper">
            <p class="legends__text-equals has-text-weight-bold">
              =
            </p>
            <p class='legends__text'>
              <span class='has-text-weight-bold'>nonprofits freeing slaves.</span> &nbsp;Slaves escaping north to freedom relied on the North Star as a beacon and compass because it doesn't change its location. Today, slaves gaining freedom rely on nonprofits that are unwavering in their help, so we represent them with stars.
            </p>
          </div>
        </div>
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
  top: auto;
  transition: top .2s ease;

  &__content {
    display: flex;
    margin-left: 0;
    margin-right: 0;
    flex-direction: column;

    @include tablet {
      flex-direction: row;
    }

    @include desktop {
      margin-left: -1.375em;
      margin-right: -1.375em;
    }
  }

  &__container {
    max-width: 1420px;
    margin-left: auto;
    margin-right: auto;
  }

  &--minimized {
    // bottom: -195px;

    // @media (min-width: 576px) {
    //   bottom: -158px;
    // }

    // @media (min-width: 730px) {
    //   bottom: -150px;
    // }

    // @include tablet {
    //   bottom: -138px;
    // }

    // @include desktop {
    //   bottom: -156px;
    // }

    // @include fullhd {
    //   bottom: -128px;
    // }
    top: calc(100% - 20px);
  }

  img {
    vertical-align: middle;
  }

  &__button-container {
    position: absolute;
    top: -16px;
    left: 0;
    right: 2%;
    padding-right: .5em;
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

  &__text-wrapper {
    display: flex;
    padding-left: .5em;
    flex: 1;
    max-width: 100%;
  }

  &__text-equals {
    margin-right: .5em; 
    margin-bottom: 0;
  }

  &__text {
    font-size: 16px;
    color: #fff;
  }

  &__text,
  &__text-equals {
    color: #fff;
    font-size: 14px;
    margin-bottom: 0;

    @include desktop {
      font-size: 16px;
    }

    @include fullhd {
      font-size: 18px;
    }
  }
}

.legend {
  display: flex;
  align-items: flex-start;
  margin-top: .5em;
  padding-left: .1em;
  padding-right: .1em;

  @include tablet {
    max-width: 50%;
  }

  img {
    margin-top: -.25em;
    flex: 1;
    max-width: 29px;
    flex-basis: 29px;
  }
  
  // p {
  //   font-size: 17px;
  //   color: #fff;
  //   margin-bottom: 0;
  //   margin-left: 1.25em;

  //   span {
  //     display: inline-block;
  //     margin-left: -.875em;
  //   }
  // }

  &:first-of-type {
    padding-right: 1rem;
  }

  &:last-of-type {
    padding-left: .375rem;
  }
}
</style>
