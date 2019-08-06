<template>
  <div class="participant-fundraiser is-flex">
    <div class="participant-fundraiser__info">
      <p class="participant-fundraiser__title has-text-weight-bold">{{ fundraiser.name }}</p>
      <div class="participant-fundraiser__cause">
        <img 
          :src="require(`Public/img/event-images/${fundraiserData.imgName}`)" 
          :alt="fundraiser.name" 
          style="max-width: 165px; width:165px; vertical-align: middle; margin-top: -5px; max-height: 55px; object-fit: contain"
        >
        <span> for {{ fundraiser.for }}</span>
      </div>
    </div>
    <div class="participant-fundraiser__progress has-text-right">
      <p class="has-text-weight-bold mb-2"> {{ fundraiser.raised | usdCurrencyFormat }} <span class="text-gray has-text-weight-normal"> of {{ fundraiser.goal | usdCurrencyFormat }}</span></p>
      <a href="#" class="has-text-weight-bold">Donate</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ParticipantFundraiser',

  props: {
    fundraiser: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState('fundraisers', {
      fundraiserData (state) {
        return state.data.find(fundraiser => fundraiser.slug === this.fundraiser.fundraiserSlug)
      },
    })
  },
}
</script>


<style lang='scss' scoped>
.participant-fundraiser {
  justify-content: space-between;

  p {
    line-height: 1.5;
    margin-bottom: .5em;
  }

  &__cause {
    margin-bottom: 0 !important;

    img {
      margin-right: .5rem;
    }
  }

  &__info {
    color: #000;
    @include tablet {
      max-width: 75%;
    }
  }
}
</style>
