<template>
<div class='nonprofit-directory-list-item'>
  <div class='nonprofit-directory-list-item__nonprofit-details'>
    <span class='nonprofit-directory-list-item__name'>{{ nonprofit.name }}</span>
  </div>
  <div class='nonprofit-list-item-links'>
    <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }" class='nonprofit-directory-list-item__link'>View Profile</router-link>
    <button class='nonprofit-directory-list-item__link nonprofit-directory-list-item__button  is-primary is-small button'>Donate</button>
    <router-link :to='`/nonprofit/${nonprofit.id}`' class='nonprofit-directory-list-item__link'>See all its locations.</router-link>
    <button v-if='showClaimNonprofitButton' class='nonprofit-directory-list-item__link nonprofit-directory-list-item__button nonprofit-directory-list-item__button--claim is-primary is-small button'>Claim this nonprofit</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'NonprofitDirectoryListItem',

  props: {
    nonprofit: {
      type: Object,
      required: true,
    },

    showClaimNonprofitButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>

<style lang="scss" scoped>
.nonprofit-directory-list-item {
  display: flex;
  align-items: flex-start;

  &:not(:last-child) {
    margin-bottom: 2em;
  }

  &__name {
    display: inline-block;
    margin-right: 1em;
    font-size: 20px;
    min-width: 300px;
    max-width: 300px;
  }

  a {
    text-decoration: underline;
    font-size: 17px;
  }

  &__link {
    font-size: .875em;
  }

  &__nonprofit-details { 
    margin-right: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }

  &__button {
    padding: .125em .5em !important;
    height: auto;
    margin-right: 32px;

    &--claim {
      background-color: $secondary;
      color: #000;
    }
  }
}

.nonprofit-list-item-links {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    margin-right: 32px;
  }
}
</style>

