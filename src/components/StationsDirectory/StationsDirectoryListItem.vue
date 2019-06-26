<template>
<div class='stations-directory-list-item'>
  <div class="columns stations-directory-list-item__columns">
    <div class="column is-3 stations-directory-list-item__img-column">
      <h4 class='has-text-weight-bold'>
        <router-link :to="{ name: 'stations-profile', params: { id: station.id } }">{{ station.name }}</router-link>
      </h4>
      <div class="stations-directory-list-item__img">
        <img :src="station.picture" :alt="station.name">
      </div>
    </div>
    <div class="column stations-directory-list-item__details-column">
      <div class="columns stations-directory-list-item__details-block">
        <div class="column is-3">
          <p class='is-marginless'><span class="has-text-weight-bold">Participants:</span> {{ station.participants }}</p>
        </div>
        <div class="column">
          <p class='is-marginless'><span class="has-text-weight-bold">Amount Donated:</span> {{ station.amountDonated | usd }}</p>
        </div>
      </div>
      <div class="columns stations-directory-list-item__details-block stations-directory-list-item__details-block--last">
        <div class="column">
          <p class='is-marginless'><span class="has-text-weight-bold">Location:</span> {{ station.position.name }}</p>
        </div>
      </div>
      <p>{{ station.tagline }}</p>
      <div class="stations-directory-list-item__actions">
        <router-link :to="{ name: 'stations-profile', params: { id: station.id } }" class='button is-secondary'>Visit</router-link>
        <router-link to="#" class='button is-primary'>Join</router-link>
        <div class="stations-directory-list-item__management-actions" v-if='isManagement'>
          <router-link to="#" class='has-text-danger is-primary' >Get info</router-link>
          <router-link to="#" class='has-text-danger is-primary'>Admin this station</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'StationsDirectoryListItem',

  props: {
    station: {
      type: Object,
      required: false,
    },
  },

  computed: {
    isManagement () {
      return this.$route.meta.management
    },
  }
}
</script>

<style lang="scss" scoped>
.stations-directory-list-item {
  padding-top: 1em;
  padding-bottom: 1.25em;

  &:first-child {
    padding-top: 2em;
  }

  p {
    font-size: 18px;
  }

  h4 {
    font-size: 24px;
    color: $primary;
    margin-bottom: .75rem;
  }

  &__img-column {
    width: 380px;
  }

  &__details-column {
    display: flex;
    flex-direction: column;

    @include tablet {
      margin-top: 50px;
    }
  }

  &__columns {
    align-items: stretch;
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: auto;

    a {
      font-size: 0.875em;
      padding: 0.125em 0.5em !important;
      height: auto;
    }

    > a {
      &:not(:last-of-type) {
        margin-right: .375em;
        @media (min-width: 576px) {
          margin-right: 1em;
        }
      }
    }
  }

  &__management-actions {
    margin-left: .375em;

    @media (min-width: 576px) {
      margin-left: 1em;
    }
    
    a {
      text-decoration: underline;
      padding: 0 !important;
      
      @include tablet {
        font-size: 1em;
      }
      
      &:not(:last-of-type) {
        margin-right: .375em;
        @media (min-width: 576px) {
          margin-right: 1em;
        }
      }
    }
  }

  img {
    // min-height: 225px;
    height: 200px;
    width: 100%;
    object-fit: cover;
  }

  &__details-block { 
    &:last-of-type {
      margin-bottom: .25rem;
    }

    > .column {
      padding-top: .25rem;
      padding-bottom: .25rem;

      @include tablet {
        padding-top: .5rem;
        padding-bottom: .5rem;
      }
    }
  }
}
</style>

