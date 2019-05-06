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
        <div class='nonprofit-details__block is-flex nonprofit-details__name-block'>
          <h4 class='has-text-weight-bold nonprofit-details__name'>{{ nonprofit.name }}</h4>
        </div>
        <div class='nonprofit-details__block is-flex'>
          <p class='is-flex nonprofit-details__website-block'>
            <a :href='nonprofit.url' target='_blank'>View Website</a>
            <button class="button is-secondary is-small">Donate</button>
          </p>
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
      <div class="actions">
        <button
          class='button is-info actions__button'
          @click.prevent.stop='onSwitchThemeClicked()'
        >
          <icon-night-mode 
            :width='33.42'
            :height='33.42'
            v-if='mapStyle === "light"'
          />
          <icon-light-mode 
            :width='33.42'
            :height='33.42'
            v-if='mapStyle === "dark"'
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Avatar from 'LocalComponents/Avatar/Avatar'
import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

import IconNightMode from 'LocalComponents/Icons/IconNightMode'
import IconLightMode from 'LocalComponents/Icons/IconLightMode'

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
    IconNightMode,
    IconLightMode,
  },

   methods: {
    onSwitchThemeClicked () {
      const style = this.mapStyle === 'light' ? 'dark' : 'light'
      
      this.changeMapStyle(style)
    },

    ...mapActions({
      changeMapStyle: 'map/changeMapStyle',
    }),
  },

  computed: {
    ...mapState({
      mapStyle: state => state.map.mapStyle
    })
  }
}
</script>

<style lang="scss" scoped>
.nonprofit-details {
  &__label {
    margin-right: .875em;
  }

  &__map {
    position: relative;
    height: 580px;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }

  &__name-block {
    margin-bottom: 1rem;
  }

  &__name {
    margin-right: 1em;
    margin-bottom: 0;
  }
  &__details-column {
    margin-right: 20px;
  }

  &__website-block {
    align-items: center;

    a {
      margin-right: .875em;
    }
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
    content: counter(list) ". ";
    counter-increment: list;
    color: blue;
  }

  .button.is-small {
    font-size: 0.875rem;
  }

  .actions {
    position: absolute;
    top: 10%;
    right: 2%;
    margin-top: 1em;
    padding-top: .5em;
    padding-left: .5em;
    &__button {
      background-color: transparent !important;
      padding: 0;
      outline: none !important;
      box-shadow: none !important;
    }
  }

}
</style>
