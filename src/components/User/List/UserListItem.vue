<template>
  <div class="user-list-item">
    <div class="columns">
      <div class="user-list-item__details column">
        <div class="user-list-item__details-item user-list-item__details-item--name">
          <router-link :to='{ name: "user-profile", params: { userId: user.id } }' class="has-text-weight-bold">{{ `${user.firstName} ${user.lastName}` }}</router-link>
        </div>
        <div class="user-list-item__details-item user-list-item__details-item--username">
          {{ `${user.userName}` }}
        </div>
        <div class="user-list-item__details-item user-list-item__details-item--location">
          {{ `${user.location}` }}
        </div>
      </div>
      <div class="user-list-item__actions column">
        <router-link :to='{ name: "user-edit", params: {userId: user.id} }'>Edit</router-link>
        <button @click='onDeleteClicked' class='button user-list-item__delete has-text-danger'>
          <icon 
            icon='trash-can'
            :iconheight='24'
            :iconwidth='24'
            color='#ff3860'
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'Components/general/Icons'

export default {
  name: 'UserListItem',

  components: {
    Icon,
  },

  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  methods: {
    onDeleteClicked () {
      this.$emit('delete', this.user.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-list-item {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &__details {
    display: flex;
    flex-basis: 880px;
  }

  &__details-item {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 33%;
    font-size: 1.125rem;

    &:not(:last-child) {
      // margin-left: 1rem;
    }

    &--name {
      flex-basis: 27%;
    }
  }

  &__actions {
    display: flex;
    align-items: center;

    a {
      text-decoration: underline;

      &:not(:last-child) {
        margin-right: .5em;
      }
    }
  }

  &__delete {
    height: auto;
    border-color: transparent;
    padding: 0 !important;
    line-height: 1.4;
    background-color: transparent !important;
    text-decoration: underline;
  }
}
</style>

<style lang='scss'>
.user-list-item {
  &__delete {
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
