<template>
  <div class='nonprofit-details'>
    <div class='nonprofit-details__columns columns'>
      <div class='column is-2 nonprofit-details__picture-column'>
        <Avatar 
          :url='nonprofit.picture'
          :alt='nonprofit.name'
        />
      </div>
      <div class='column is-5 nonprofit-details__details-column'>
        <div class='nonprofit-details__block is-flex'>
          <h4 class='has-text-weight-bold'>{{ nonprofit.name }}</h4>
        </div>
        <div class='nonprofit-details__block is-flex'>
          <p class='nonprofit-details__label has-text-weight-bold'>Website Link: </p>
          <a :href='nonprofit.url' target='_blank'>View Website</a>
        </div>
        <div class='nonprofit-details__block is-flex'>
          <p>{{ nonprofit.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales, purus at varius interdum, est sem mollis nulla amet.' }}</p>
        </div>
      </div>
      <div class='nonprofit-details__office-locations column'>
        <p class='has-text-weight-bold'>Locations: </p>
        <template v-if='nonprofit.locations.length === 0'>
          <p>
            There are no registered locations for this nonprofits yet.
          </p>
        </template>
        <template v-else>
          <ol class='nonprofit-details__locations'>
            <li 
              class='nonprofit-details__locations-item'
              v-for='(location, index) in nonprofit.locations'
              :key='location.placeId || index'
            >
              {{ location.location }}
            </li>
          </ol>
        </template>
      </div>
    </div>
    <div class='nonprofit-details__map'>
      <virtual-railroad-map 
        :users='[]'
        :nonprofits='[nonprofit]'
        :icon-size='32'
        :zoom='2'
      />
    </div>
  </div>
</template>

<script>
import Avatar from 'LocalComponents/Avatar/Avatar'
import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

export default {
  name: 'NonprofitDetails',

  props: {
    nonprofit: {
      type: Object,
      required: true,
    },
  },

  components: {
    Avatar,
    VirtualRailroadMap,
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-details {
  &__label {
    margin-right: .875em;
  }

  &__map {
    position: relative;
    height: 500px;
    max-width: 990px;
    margin-left: auto;
    margin-right: auto;
  }

  &__picture-column {
    margin-right: 20px;
  }

  &__details-column {
    margin-right: 20px;
  }

  a {
    text-decoration: underline;
  }

  ol {
  counter-reset: list;
  }

  ol > li {
    list-style: none;
    margin-bottom: 0.875em;
  }

  ol > li:before {
    content: counter(list, lower-alpha) " ) ";
    counter-increment: list;
  }
}
</style>
