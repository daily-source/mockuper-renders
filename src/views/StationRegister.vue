<template>
  <div class="station-register">
    <app-header />
    <intro-video />
     <section class="section station-register__section">
      <transition
        name='slider-fade'
        mode='out-in'
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view />
      </transition>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'StationRegister',

  components :{
    AppHeader,
    IntroVideo,
    SharedFooter,
  },

  mounted () {},

  methods :{
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },

    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter(element) {
      element.style.height = 'auto';
    },
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `Register a Station | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>

<style lang='scss'>
.station-register {
  &__heading {
    font-size: 1.875rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  &__subheading {
    @include tablet {
      font-size: 1.125em;
      margin-bottom: 1.25em;
    }

    a {
      color: $secondary;
      text-decoration: underline !important;
    }
  }
}

.slider-fade-enter,
.slider-fade-leave-active {
  opacity: 0
}

.slider-fade-enter-active,
.slider-fade-leave-active {
  transition-duration: .5s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
</style>
