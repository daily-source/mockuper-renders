<template>
<div class='nonprofit-directory-list-item'>
  <div class='nonprofit-directory-list-item__nonprofit-details'>
    <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }"><span class='nonprofit-directory-list-item__name'>{{ nonprofit.name }}</span></router-link>
  </div>
  <div class='nonprofit-list-item-links'>
    <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }" class='nonprofit-directory-list-item__link'>View Profile</router-link>
    <button class='nonprofit-directory-list-item__link nonprofit-directory-list-item__button is-secondary is-small button'>Donate</button>
    <router-link 
      :to='`/nonprofit/${nonprofit.id}`' 
      class='nonprofit-directory-list-item__link'
      v-if='shouldShowLocationsButton'
    >
      See more locations
    </router-link>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NonprofitDirectoryListItem',

  props: {
    nonprofit: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      shouldShowLocationsButton (state) {
        const nonprofit = state.nonprofits.data.find(np => this.nonprofit.id === np.id)

        return nonprofit && nonprofit.locations.length > 1
      }
    })
  },
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
    font-size: 22px;
    min-width: 355px;
    max-width: 355px;
  }

  a {
    text-decoration: underline;
    font-size: 17px;
  }

  &__link {
    font-size: .875em;
  }

  &__nonprofit-details { 
    margin-right: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }

  &__button {
    padding: .125em .5em !important;
    height: auto;
    margin-right: 28px;
  }
}

.nonprofit-list-item-links {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    margin-right: 28px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

