<template>
  <div class="fundraiser">
    <div class="fundraiser__img-container">
      <img 
        :src="getUserAvatar(user.imgName)" 
        alt="Image placeholder" 
      >
    </div>
    <div class="fundraiser__info">
      <h5 class="fundraiser__title has-text-weight-bold has-text-primary">{{ fundraiser.name }}</h5>
      <small class='fundraiser__user'>by {{ user.name }}</small>
      <img 
        class='fundraiser__image'
        :src="require(`Public/img/event-images/${fundraiserData.imgName}`)" 
        alt="Quitathon"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import avatar from '@/util/avatar'

export default {
  name: 'Fundraiser',

  props: {
    fundraiser: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getUserAvatar (img) {
      return avatar.getUserAvatar(img)
    },
  },

  computed: {
    ...mapState('users', {
      user (state) {
        return state.data.find(user => user.id === this.fundraiser.userId)
      }
    }),
    ...mapState('fundraisers', {
      fundraiserData (state) {
        return state.data.find(fundraiser => fundraiser.slug === this.fundraiser.fundraiserSlug)
      } 
    }),
  },
}
</script>

<style lang='scss' scoped>
.fundraiser {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid #ddd;
  display: flex;

  &:first-of-type {
    border-top: 0;
  }

  &__img-container {
    width: 100px;
    height: 100px;
    margin-right: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__image {
    max-width: 200px;
  }

  &__info {
    flex-grow: 1;
  }

  &__title {
    font-size: 1.25em;
    line-height: 1.5;
  }

  &__user {
    color: #343a40;
  }
}
</style>
