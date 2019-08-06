<template>
<div class="donation">
  <div class="donation__img-container">
    <img 
      :src="getUserAvatar(user ? user.imgName : null)" 
      :alt="`${user.name} Avatar`"
    >
  </div>
  <div class="donation__details">
    <div class="donation__header is-flex">
      <p class='donation__user-name has-text-weight-bold'>{{ user.name }}</p>
      <span class="donation__amount">{{ donation.amount | usdCurrencyFormat(2) }}</span>
    </div>
    <div class="donation__date" v-if="donation.date">
      <small>{{ donation.date }}</small>
    </div>
    <p class="donation__message" v-if="donation.message"> {{ donation.message }}</p>
  </div>
</div>
</template>

<script>
import user from '@/util/user'
import avatar from '@/util/avatar'

export default {
  name: 'Donation',

  props: {
    donation: {
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
    user () {
      return user.fetchUserDetails(this.donation.userId)
    },
  },
}
</script>

<style lang="scss" scoped>
.donation {
  display: flex;
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }

  &__img-container {
    width: 90px;
    height: 90px;
    margin-right: 1rem;
    flex-basis: 90px;
    min-width: 90px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__details {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;

    p,
    span {
      font-size: 1.125em;
      line-height: 1.5;
      margin-bottom: 0;
    }
  }

  &__header {
    justify-content: space-between;
  }

  &__amount {
    color: $secondary;
    font-weight: 700;
  }

  &__date {
    small {
      color: #6c757d;
    }
  }

  &__message {
    font-size: 1em !important; 
  }
}
</style>
