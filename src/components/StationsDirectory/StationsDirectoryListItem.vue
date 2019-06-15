<template>
<div class='stations-directory-list-item'>
  <div class="columns stations-directory-list-item__columns">
    <div class="column is-3 stations-directory-list-item__img-column">
      <h4 class='has-text-weight-bold'>{{ station.name }}</h4>
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
          <p class='is-marginless'><span class="has-text-weight-bold">Location:</span> {{ station.location }}</p>
        </div>
      </div>
      <p>{{ station.tagline }}</p>
      <div class="stations-directory-list-item__actions">
        <a href="#">Visit</a>
        <a href="#">Join</a>
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
    width: 325px;
  }

  &__details-column {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }

  &__columns {
    align-items: stretch;
  }

  &__actions {
    margin-bottom: 1rem;

    a {
      color: $blue;
      text-decoration: underline;
      margin-right: 1.25em;
    }
    margin-top: auto;
  }

  img {
    min-height: 225px;
    width: 100%;
    object-fit: cover;
  }

  &__details-block { 
    &:last-of-type {
      margin-bottom: .25rem;
    }

    > .column {
      padding-top: .5rem;
      padding-bottom: .5rem;
    }
  }
}
</style>

