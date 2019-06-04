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
          <h4 class='has-text-weight-bold organization-details__name'>{{ hoyaMarker.name }}</h4>
        </div>
        <div class='organization-details__block is-flex'>
          <div v-html='organization.description'></div>
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
    <div class="organization-details__alumni-section">
      <h3 class='has-text-weight-bold'>People who support the Hoya Railroad</h3>
      <div class="columns">
        <div class="column is-6">
          <div class="list-section">
            <h4 class='has-text-primary has-text-weight-bold'>Current students</h4>
            <ul>
              <li>
                <span class="has-text-weight-bold">Class of 2020</span>
                <ul>
                  <li>
                    Jill Smith
                  </li>
                  <li>
                    Kevin Guitierrez
                  </li>
                  <li>
                    Susan Lundgren
                  </li>
                  <li>
                    Mel Hollis
                  </li>
                  <li>
                    Karen Nguyen
                  </li>
                </ul>
              </li>
              <li>
                <span class="has-text-weight-bold">Class of 2021</span>
                <ul>
                  <li>
                    Ira Rosen 
                  </li>
                  <li>
                    Jason Claiborne  
                  </li>
                  <li>
                    Nick Palexis
                  </li>
                  <li>
                    Mel Hollis
                  </li>
                  <li>
                    Linda Joubert
                  </li>
                </ul>
              </li>
              <li>
                <span class="has-text-weight-bold">Class of 2022</span>
                <ul>
                  <li>
                    Mackensie Stevens
                  </li>
                  <li>
                    Mike Andrews  
                  </li>
                  <li>
                    Nate Birbiglia 
                  </li>
                </ul>
              </li>
              <li>
                <span class="has-text-weight-bold">Class of 2023</span>
                <ul>
                  <li>
                    Yousef Kabran
                  </li>
                  <li>
                    David Tosi
                  </li>
                  <li>
                    Amet Guzdar
                  </li>
                  <li>
                    Justin Pearl
                  </li>
                  <li>
                    Ted Roppel 
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="list-section">
            <h4 class='has-text-primary has-text-weight-bold'>Alumni</h4>
            <ul class=''>
              <li>
                <ul>
                  <li>Michelle Lindbloom</li>
                  <li>Theresa Sampson </li>
                  <li></li>
                </ul>
              </li>
              <li></li>
            </ul>
            <ul class='marginless-list'>
              <li><span class="has-text-weight-bold">Class of 2019</span></li>
              <li><span class="has-text-weight-bold">Class of 2018</span></li>
              <li><span class="has-text-weight-bold">Class of 2017</span></li>
              <li><span class="has-text-weight-bold">Class of 2016</span></li>
              <li><span class="has-text-weight-bold">Class of 2015</span></li>
              <li><span class="has-text-weight-bold">Class of 2014</span></li>
            </ul>
          </div>
        </div>
        <div class="column is-4">
          <div class="list-section">
            <h4 class='has-text-primary has-text-weight-bold'>Fans</h4>
            <ul class='marginless-list'>
              <li>
                Jay Ansin
              </li>
              <li>
                Roy Amberger                                                                   
              </li>
              <li>
                Lily Hilgrow
              </li>
              <li>
                Rob Cohen
              </li>
              <li>
                Daniel Kim
              </li>
              <li>
                Anthony LarelliTina Kavowski
              </li>
              <li>
                Tom Newfield
              </li>
              <li>
                Linda Moore
              </li>
              <li>
                Laphonso Deon
              </li>
              <li>
                Pablo Ruiz David Lobell
              </li>
              <li>
                Jill Hagandanz
              </li>
              <li>
                David Chen
              </li>
              <li>
                Walter Thoreau
              </li>
            </ul>
          </div>
          <div class="list-section">
            <h4 class='has-text-primary has-text-weight-bold'>Faculty and staff</h4>
            <ul class='marginless-list'>
              <li>
                Alex Curran
              </li>
              <li>
                Andrew Enoch
              </li>
              <li>
                Laurence Falvey
              </li>
              <li>
                Peter Ferguson
              </li>
              <li>
                Hunter Aron
              </li>
              <li>
                Maggie Olerud
              </li>
              <li>
                Sumi Lee
              </li>
            </ul>
          </div>
        </div>
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
        name: 'Hoya Railroad',
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
    max-width: 737px;

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

    &:last-child {
      margin-bottom: 0;
    }

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

  &__alumni-section {
    max-width: 990px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 2em;
    padding-bottom: 2em;

    h3 {
      font-size: 34px;
      margin-bottom: 1.5rem;
    }

    ul {
      > li {
        margin-bottom: 1em;
        font-size: 18px;

        &:last-child {
          margin-bottom: 0;
        }

        ul {
          padding-left: 1em;

          > li {
            margin-bottom: 0;
          }

        }
      }
    }

    h4 {
      font-size: 28px;
      margin-bottom: .75rem;
    }

    .marginless-list {
      li {
        margin-bottom: 0;
      }
    }
  }

  .list-section {
    margin-top: 1em;

    &:first-of-type {
      margin-top: 0;
    }
  }
}
</style>

<style lang='scss'>
.organization-details {
  p {
    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: underline;
    }
  }
}
</style>
