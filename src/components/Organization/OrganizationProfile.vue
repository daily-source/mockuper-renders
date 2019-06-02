<template>
  <div class='organization-details'>
    <div class='organization-details__columns columns'>
      <div class='column is-3 organization-details__picture-column'>
        <Avatar 
          :url='organization.picture'
          :alt='organization.name'
        />
      </div>
      <div class='column organization-details__details-column'>
        <div class='organization-details__block is-flex organization-details__name-block'>
          <h4 class='has-text-weight-bold organization-details__name'>{{ organization.name }}</h4>
          <a href='#' target='_blank'>View Website</a>
        </div>
        <div class='organization-details__block is-flex'>
          <p v-html='organization.description'></p>
        </div>
      </div>
      <!-- <div class='organization-details__office-locations column'>
        <p class='has-text-weight-bold'>Locations: </p>
        <template v-if='organization.locations.length === 0'>
          <p>
            There are no registered locations for this organizations yet.
          </p>
        </template>
        <template v-else>
          <ol class='organization-details__locations'>
            <li 
              class='organization-details__locations-item'
              v-for='(location, index) in organization.locations'
              :key='location.placeId || index'
            >
              {{ location.location }}
            </li>
          </ol>
        </template>
      </div> -->
    </div>
    <div class='organization-details__map'>
      <virtual-railroad-map 
        :users='[]'
        :nonprofits='[]'
        :icon-size='32'
        :zoom='2'
        :center='{
          lat: 22.852884267366456,
          lng: 18.883774238974297,
        }'
        :nonprofit-marker='hoyaMarker'
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
  name: 'organizationDetails',

  props: {
    organization: {
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

  data () {
    return {
      hoyaMarker: {
        position: {
          lat: 38.907689,
          lng: -77.0737924,
        },
        name: 'Georgetown University',
        icon: require('@/assets/img/georgetown-hoyas-kepsar-mossor.png'),
        mainImage: require('@/assets/img/georgetown_school_photo.png'),
      },
    }
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
.organization-details {
  padding-top: 2em;
  padding-bottom: 2em;

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

  &__name-block {
    margin-bottom: 1rem;
    align-items: center;
  }

  &__name {
    margin-right: 1em;
    margin-bottom: 0;
  }

  &__details-column {
    margin-right: 20px;
    max-width: 720px;

    &:last-child {
      margin-right: 0;
      padding-right: 0;
    }
  }

  &__website-block {
    align-items: center;

    a {
      margin-right: .875em;
    }
  }

  p {
    a {
      text-decoration: underline;
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
    width: 14px;
    display: inline-block;
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
