<template>
  <div class="layout-base">
    <the-header />
    <the-banner />
		<income-levels-slider />
    <section class='card-slider-wrapper'>
      <h2 class='card-slider-wrapper__heading'>See All The Income Levels</h2>
      <div 
        class='card-slider-section'
        v-for='(incomeLevel, index) in topIncomeLevels'
        :key='`top-half-${index}`' 
      >
        <div class='container'>
          <h2 class='has-text-weight-bold'>{{ `Top ${incomeLevel.percent}: Over $${incomeLevel.value}` }}</h2>
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
      <!-- <div class='exact-middle card-slider-section'>
        <div class='container exact-middle__container'>
          <h2 class='has-text-weight-bold'>The middle: $2,350</h2>
          <card-slider 
            :income-level='middle'
            :is-middle='true'
          />
        </div>
      </div> -->
      <div 
        class='card-slider-section'
        v-for='(incomeLevel, index) in bottomIncomeLevels'
        :key='`bottom-half-${index}`' 
      >
        <div class='container'>
          <h2 class='has-text-weight-bold'>{{ `Bottom ${incomeLevel.percent}: Under $${incomeLevel.value}` }}</h2>
          <card-slider 
            :income-level='incomeLevel'
          />
        </div>
      </div>
    </section>
    <div class='cta'>
      <div class='container has-text-centered'>
        <button class='button is-large is-primary'>Help the people in the bottom 50% now</button>
      </div>
    </div>
    <shared-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TheHeader from 'LocalComponents/0to100/TheHeader'
import TheBanner from 'LocalComponents/0to100/TheBanner'
import IncomeLevelsSlider from 'LocalComponents/0to100/IncomeLevelsSlider'
import CardSlider from 'LocalComponents/0to100/CardSlider'
import SharedFooter from 'Components/Shared/SharedFooter.vue'


export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    TheHeader,
    TheBanner,
		IncomeLevelsSlider,
    CardSlider,
    SharedFooter,
  },

  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = "Double the results, half the effort. A Volunteerathon® lets you make a far greater impact with your time than traditional fundraising events."
    var title = "Create a volunteerathon and do good!"
    return {
      title: '0to100 - v5',
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },

  computed: {
    ...mapGetters({
      topIncomeLevels: 'incomeLevels/topHalf', 
      bottomIncomeLevels: 'incomeLevels/bottomHalf',
      middle: 'incomeLevels/middle',
    }),
  },
};
</script>

<style lang='scss' scoped>
.card-slider-section {
  margin-bottom: 2em;
	margin-top: 2em;

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
    margin-bottom: 23px;

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
    font-size: 1em;

    @include tablet {
      font-size: 1.20em;
    }
  }
}

.card-slider-wrapper {
  margin-top: 1.5em;

  &__heading {
    font-size: 2.75em;
    color: $primary;
    text-align: center;
    font-weight: 700;
    position: relative;

    &::after {
      content: '';
      display: block;
      max-width: 200px;
      margin-top: 0.25em;
      margin-left: auto;
      margin-right: auto;
      height: 3px;
      background-color: #ddd;
    }
  }
}

.cta {
  margin-bottom: 3em;

  .button {
    font-size: 1.375rem !important;
  }
}
</style>
