<template>
  <div class="layout-base">
    <the-header />
    <the-banner />
    <div 
      class='card-slider-section'
      v-for='(incomeLevel, index) in topIncomeLevels'
      :key='`top-half-${index}`' 
    >
      <div class='container'>
        <h2 class='has-text-weight-bold'>{{ incomeLevel.name }}</h2>
        <card-slider 
          :income-level='incomeLevel'
        />
      </div>
    </div>
    <div class='exact-middle card-slider-section'>
      <div class='container exact-middle__container'>
        <h2 class='has-text-weight-bold'>The middle: $2,350</h2>
        <p>50% of people in the world live on less than $2,350 and 50% live on more than that. This fully takes into account PPP. The temporarily homeless and the chronic homeless in the U.S. live on far more than $2,350 putting them in the top half. </p>
        <p>At present, about 95% of donating by people in wealthy nations like the U.S. goes towards the richest 30% of the world, about 1% goes to people in the 30% to 50% range, and only 5% goes to people in the bottom 50%. Giving that is more fair and more balanced is needed. Please commit to changing this unfairness by joining the <a href='#'>50/50 Pledge</a> to make at least half of your giving go to people in the bottom half. </p>
      </div>
    </div>
    <div 
      class='card-slider-section'
      v-for='(incomeLevel, index) in bottomIncomeLevels'
      :key='`bottom-half-${index}`' 
    >
      <div class='container'>
        <h2 class='has-text-weight-bold'>{{ incomeLevel.name }}</h2>
        <card-slider 
          :income-level='incomeLevel'
        />
      </div>
    </div>
    <shared-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TheHeader from 'LocalComponents/0to100/TheHeader'
import TheBanner from 'LocalComponents/0to100/TheBanner'
import CardSlider from 'LocalComponents/0to100/CardSlider'
import SharedFooter from 'Components/Shared/SharedFooter.vue'

export default {
  name: 'BaseLayout',

  components: {
    TheHeader,
    TheBanner,
    CardSlider,
    SharedFooter,
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Maximum Good - Home',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

  computed: {
    ...mapGetters({
      topIncomeLevels: 'incomeLevels/topHalf', 
      bottomIncomeLevels: 'incomeLevels/bottomHalf', 
    })
  },
};
</script>

<style lang='scss' scoped>
.card-slider-section {
  margin-bottom: 1em;

  @include tablet {
    margin-bottom: 3em;
  }

  &:first-of-type {
    margin-top: 1em;

    @include tablet {
      margin-bottom: 3em;
    }
  }

  h2 {
    color: $primary !important;
    text-align: center;
    font-size: 1.25em;

    @include tablet {
      font-size: 1.5em;
    }

    @include desktop {
      font-size: 1.875em;
    }
  }
}

.exact-middle {
  &__container {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  a {
    text-decoration: underline;
  }

  p {
    font-size: .875em;

    @include tablet {
      font-size: 1em;
    }
  }
}
</style>
