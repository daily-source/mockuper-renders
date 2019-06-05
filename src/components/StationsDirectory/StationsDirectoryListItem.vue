<template>
<div class='stations-directory-list-item'>
  <div class="columns stations-directory-list-item__columns">
    <div class="column is-3 stations-directory-list-item__img-column">
      <div class="stations-directory-list-item__img">
        <img :src="station.picture" :alt="station.name">
      </div>
    </div>
    <div class="column stations-directory-list-item__details-column">
      <div class="columns stations-directory-list-item__details-block">
        <div class="column stations-directory-list-item__name-block">
          <h4 class='has-text-weight-bold'>{{ station.name }}</h4>
          <p class="is-marginless">{{ station.location }}</p>
        </div>
      </div>
      <div class="columns stations-directory-list-item__details-block">
        <div class="column is-3">
          <p class='is-marginless'><span class="has-text-weight-bold">Participants:</span> {{ station.participants }}</p>
        </div>
        <div class="column">
          <p class='is-marginless'><span class="has-text-weight-bold">Amount Donated:</span> {{ station.amountDonated | usd }}</p>
        </div>
      </div>
      <p>{{ station.tagline }}</p>
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
  padding-bottom: 1em;

  &:first-child {
    padding-top: 2em;
  }

  p {
    font-size: 18px;
  }

  &__name-block {
    display: flex;
    align-items: flex-end;
  }

  h4 {
    margin-bottom: 0;
    font-size: 28px;
    margin-right: 30px;
    color: $primary;
    line-height: 1;
  }

  &__img {
    height: 100%;
  }

  img {
    min-height: 166px;
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

