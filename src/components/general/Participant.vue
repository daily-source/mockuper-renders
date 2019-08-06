<template>
  <div class="participant is-flex">
    <div class="participant__img-container">
      <img 
        :src="getUserAvatar(user.imgName)" 
        :alt="user.name"
      >
    </div>
    <div class="participant__details">
      <div class="participant__info">
        <div class="participant__header is-flex">
          <h4 class='participant__name has-text-weight-bold has-text-primary'>{{ user.name }}</h4>
          <p class='participant__reached has-text-weight-bold'>{{ total | usdCurrencyFormat }}</p>
        </div>
        <div class="participant__fundraisers">
          <participant-fundraiser 
            class='participant__fundraiser'
            v-for='(fundraiser, index) in fundraisers'
            :key='index'
            :fundraiser='fundraiser'
          />
        </div>
      </div>
      <div class="participant__progress">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import avatar from '@/util/avatar'

export default {
  name: 'Participant',

  components: {
    ParticipantFundraiser: () => import('LocalComponents/general/ParticipantFundraiser')
  },

  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  methods: {
    getUserAvatar (img) {
      return avatar.getUserAvatar(img)
    },
  },

  computed: {
    total () {
      return this.fundraisers.reduce((prev, curr) => {
        return prev + curr.raised
      }, 0)
    },

    goal () {
      return this.fundraisers.reduce((prev, curr) => {
        return prev + curr.goal
      }, 0)
    },

    ...mapState('userFundraisers', {
      fundraisers (state) {
        return state.data.filter(userFundraiser => userFundraiser.userId === this.user.id)
      },
    })
  },
}
</script>

<style lang='scss' scoped>
.participant {
  padding-top: .625em;
  padding-bottom: .625em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  &__img-container {
    max-width: 100px;
    height: 100px;
    margin-right: 1em;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__header {
    justify-content: space-between;
  }

  &__details {
    flex-grow: 1;
    flex-shrink: 0;
  }

  &__info {
    flex-grow: 1;
    flex-shrink: 0;
  }

  &__name {
    font-size: 1.25em;
    line-height: 1.5;
    margin-bottom: .5rem;
    font-family: $font-primary;
  }

  &__fundraisers {
    padding-left: .5rem;
  }

  &__fundraiser {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #ddd;

    &:first-of-type {
      padding-top: 0;
    }

    &:last-of-type {
      border: 0;
    }
  }

  &__reached {
    line-height: 1.5;
    margin-bottom: 0;
    text-align: right;
    font-size: 1.25em;
    color: $secondary;
  }

  &__progress {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__donate {
    padding: 0;
    height: auto;
    background-color: transparent !important;
    color: $secondary !important;
    margin-top: auto;
    font-weight: 700;
    margin-bottom: 6px;
  }
}
</style>
