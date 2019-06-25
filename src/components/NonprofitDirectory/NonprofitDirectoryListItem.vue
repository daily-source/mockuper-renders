<template>
<div 
  :class='["nonprofit-directory-list-item", {"nonprofit-directory-list-item--management": isManagement}]'
>
  <div class='nonprofit-directory-list-item__nonprofit-details'>
    <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }"><span class='nonprofit-directory-list-item__name'>{{ nonprofit.name }}</span></router-link>
  </div>
  <div class='nonprofit-list-item-links'>
    <button v-if='showClaimNonprofitButton' :disabled='nonprofit.claimed' class='nonprofit-directory-list-item__link nonprofit-directory-list-item__button nonprofit-directory-list-item__button--claim is-secondary is-small button'>{{ !nonprofit.claimed ? 'Claim this nonprofit' : 'Already Claimed' }}</button>    
    <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }" class='button nonprofit-directory-list-item__button is-primary nonprofit-directory-list-item__link'>View Profile</router-link>
    <button class='nonprofit-directory-list-item__link nonprofit-directory-list-item__button  is-secondary is-small button' v-if='showDonateButton'>Donate</button>
    <router-link :to='`/nonprofit/${nonprofit.id}`' class='nonprofit-directory-list-item__link' v-if='shouldShowLocationsButton'>See all locations</router-link>
    <div class="nonprofit-list-item-links__management" v-if='isManagement'>
      <router-link to='#' class='nonprofit-directory-list-item__link has-text-danger'>Get info</router-link>
      <router-link to='#' class='nonprofit-directory-list-item__link has-text-danger'>Admin this nonprofit</router-link>
    </div>
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

    showClaimNonprofitButton: {
      type: Boolean,
      required: false,
      default: false,
    },

    showDonateButton: {
      type: Boolean,
      required: false,
      default: true,
    },

    showLocationsButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    isManagement () {
      return this.$route.meta.management
    },

    ...mapState({
      shouldShowLocationsButton (state) {
        const nonprofit = state.nonprofits.data.find(np => this.nonprofit.id === np.id)

        return nonprofit && nonprofit.locations.length > 1 && this.showLocationsButton
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-directory-list-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @include tablet {
    flex-direction: row;
  }

  &:not(:last-child) {
    margin-bottom: 2em;
  }

  &__name {
    display: inline-block;
    margin-bottom: 0.25em;

    @include tablet {
      font-size: 20px;
      min-width: 500px;
      max-width: 500px;
      margin-right: 1.375em;
      margin-bottom: 0;
    }
  }

  a {
    &:not(.button) {
      font-size: 14px;
      text-decoration: underline;

      @include widescreen {
        font-size: 17px;
      }
    }
  }

  &__link {
    font-size: .875em;
  }

  &__nonprofit-details { 
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }


  &__button {
    padding: .125em .5em !important;
    height: auto;
    margin-right: 1.25rem;

    &--claim {
      width: 153px;
      background-color: $secondary;
      color: #000;
      min-width: 153px;
    }
  }
}

.nonprofit-list-item-links {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center; 
  flex-wrap: wrap;

  @include tablet {
    flex-wrap: nowrap;
  }

  a {
    margin-right: 1.25rem;
    display: inline-block;


    &:not(.button) {
      font-size: 14px;
      text-decoration: underline;
      @include desktop {
        font-size: 17px;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__management {
    width: 100%;
    margin-top: .25em;

    @include tablet {
      width: auto;
    }
  }
}
</style>
