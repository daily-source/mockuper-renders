<template>
  <div class='nonprofit-details'>
    <div class='nonprofit-details__columns columns'>
      <div class='column is-4'>
        <Avatar 
          :url='nonprofit.picture'
          :alt='nonprofit.name'
        />
      </div>
      <div class='column is-4'>
        <div class='nonprofit-details__block is-flex'>
          <h4 class='has-text-weight-bold'>{{ nonprofit.name }}</h4>
        </div>
        <div class='nonprofit-details__block is-flex'>
          <p class='nonprofit-details__label has-text-weight-bold'>Description: </p>
          <p>{{ nonprofit.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales, purus at varius interdum, est sem mollis nulla amet.' }}</p>
        </div>
        <div class='nonprofit-details__block is-flex'>
          <p class='nonprofit-details__label has-text-weight-bold'>Website Link: </p>
          <a :href='nonprofit.url' target='_blank'>{{ nonprofit.url }}</a>
        </div>
      </div>
      <div class='nonprofit-details__office-locations column'>
        <p class='has-text-weight-bold'>Office Locations: </p>
        <template v-if='nonprofit.locations.length === 0'>
          <p>
            There are no registered locations for this nonprofits yet.
          </p>
        </template>
        <template v-else>
          <ol>
            <li 
              v-for='(location, index) in nonprofit.locations'
              :key='location.placeId || index'
            >
              {{ location.location }}
            </li>
          </ol>
        </template>
      </div>
    </div>
    <div class='nonprofit-map'>
      <virtual-railroad-map 
        :users='[]'
        :nonprofits='[nonprofit]'
        :icon-size='32'
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
    flex-basis: 33%;
    max-width: 33%;
    margin-left: .5em;
  }
}
</style>
