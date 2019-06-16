<template>
  <div class='station-profile'>
    <div class="container">
      <div class='station-profile__columns columns'>
        <div class='column station-profile__picture-column'>
          <Avatar 
            :url='station.picture'
            :alt='station.name'
          />
        </div>
        <div class='column station-profile__details-column'>
          <div class='station-profile__block is-flex station-profile__name-block'>
            <h4 class='has-text-weight-bold station-profile__name'>{{ marker.name }}</h4>
            <button class='button is-secondary station-profile__join-button'>
              Join
            </button>
          </div>
          <div class='station-profile__block is-flex'>
            <div v-html='station.description'></div>
          </div>
        </div>
        <!-- <div class='station-profile__office-locations column'>
          <p class='has-text-weight-bold'>Locations: </p>
          <template v-if='station.locations.length === 0'>
            <p>
              There are no registered locations for this stations yet.
            </p>
          </template>
          <template v-else>
            <ol class='station-profile__locations'>
              <li 
                class='station-profile__locations-item'
                v-for='(location, index) in station.locations'
                :key='location.placeId || index'
              >
                {{ location.location }}
              </li>
            </ol>
          </template>
        </div> -->
      </div>
    </div>
    <!-- <div class='station-profile__map'>
     <virtual-railroad-map 
        :users='[]'
        :nonprofits='[]'
        :icon-size='32'
        :zoom='4'
        :center='{
          lat: 39.66193026673745,
          lng: -90.13614734411594,
        }'
        :nonprofit-marker='marker'
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
    </div> -->
    <div class="station-profile__map-section">
      <general-info 
        :opened='true'
        class='station-general-info'
      />
      <home-page-actions 
        :show-play-button='false'
      />
      <station-map 
        :station='station'
      />
      <map-legends 
        :opened='opened'
        @toggle='toggleLegends'
      />
    </div>
    <div class="station-profile__alumni-section">
      <div class="container">
        <h3 class='has-text-weight-bold has-text-centered'>People who support the Hoya Railroad</h3>
        <div class="station-profile__alumni-section-columns">
          <div class="columns">
            <div class="column alumni-section__list-col">
              <h4 class='has-text-primary has-text-weight-bold'>Alumni</h4>
              <ul class=''>
                <!-- <li>
                  <ul>
                    <li>Michelle Lindbloom</li>
                    <li>Theresa Sampson </li>
                    <li></li>
                  </ul>
                </li> -->
                <li>
                  <span class="has-text-weight-bold">Class of 2019</span>
                  <ul>
                    <li>David Lynn</li>
                    <li>Rafael Mason</li>
                    <li>Carrie Nardelli</li>
                    <li>Narayan Achi</li>
                  </ul>
                </li>
                <li>
                  <span class="has-text-weight-bold">Class of 2018</span>
                  <ul>
                    <li>Adi Vichova</li>
                    <li>Seth Aronson</li>
                    <li>Angela Nunez</li>
                  </ul>
                </li>
                <li>
                  <span class="has-text-weight-bold">Class of 2017</span>
                  <ul>
                    <li>Sharon Wooding</li>
                    <li>Miles Ackerman</li>
                    <li>David Chung</li>
                    <li>Steve Meenan</li>
                    <li>Kristin Bresnahan</li>
                  </ul>
                </li>
                <li>
                  <span class="has-text-weight-bold">Class of 2016</span>
                  <ul>
                    <li>Scott Lindbloom</li>
                    <li>Teresa Sampson</li>
                    <li>Sebastian Quinn</li>
                  </ul>
                </li>
                <li>
                  <span class="has-text-weight-bold">Class of 2015</span>
                  <ul>
                    <li>Don Rhee</li>
                    <li>Jimmy Cranston</li>
                    <li>Marissa Wilson</li>
                    <li>Cindy Pugoli</li>
                  </ul>
                </li>
                <li>
                  <span class="has-text-weight-bold">Class of 2014</span>
                  <ul>
                    <li>Marcus Steinman</li>
                    <li>Ann Marie Petri</li>
                    <li>Lynnette Cavanaugh</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="column is-4 alumni-section__list-col">
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
            </div>
            <div class="column is-4 alumni-section__list-col">
              <div class="list-section">
                <h4 class='has-text-primary has-text-weight-bold'>Fans</h4>
                <ul class='marginless-list indented-list'>
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
                    Anthony Larelli
                  </li>
                  <li>
                    Tina Kavowski
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
                <ul class='marginless-list indented-list'>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Avatar from 'LocalComponents/Avatar/Avatar'
import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'
import MapLegends from 'LocalComponents/MapLegends'
import GeneralInfo from 'LocalComponents/General/GeneralInfo'
import HomePageActions from 'LocalComponents/HomePageActions'
import StationMap from 'LocalComponents/Station/StationMap'

import IconNightMode from 'LocalComponents/Icons/IconNightMode'
import IconLightMode from 'LocalComponents/Icons/IconLightMode'

export default {
  name: 'StationProfile',

  props: {
    station: {
      type: Object,
      required: true,
    },
  },

  components: {
    Avatar,
    VirtualRailroadMap,
    HomePageActions,
    IconNightMode,
    IconLightMode,
    MapLegends,
    StationMap,
    GeneralInfo,
  },

  data () {
    return {
      marker: {
        position: {
          lat: 38.907689,
          lng: -77.0737924,
        },
        name: 'Georgetown Hoya Station',
        icon: require('@/assets/img/georgetown-hoyas-kepsar-mossor.png'),
        mainImage: require('@/assets/img/georgetown_school_photo.png'),
      },
      opened: true,
    }
  },

  mounted () {
    this.changeMapStyle('light')
  },

  methods: {
    onSwitchThemeClicked () {
      const style = this.mapStyle === 'light' ? 'dark' : 'light'
      
      this.changeMapStyle(style)
    },

    toggleLegends () {
      this.opened = !this.opened
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
.station-profile {
  padding-bottom: 2em;

  &__label {
    margin-right: .875em;
  }

  &__name-block {
    margin-bottom: 1rem;
    align-items: center;
  }

  &__name {
    font-size: 21px;
    margin-right: 1em;
    margin-bottom: 0;
  }

  &__join-button {
    font-size: .875em;
    height: auto;
    padding: 0.125em 0.5em !important;
  }

  &__map-section {
    margin-top: 2em;
    margin-bottom: 2em;
    width: 100%;
    position: relative;
    height: 640px;
    overflow: hidden;
  }

  .home-page-actions {
    position: absolute;
    top: 10%;
    right: 2%;
    z-index: 2;
  }

  &__picture-column {
    width: 340px;
    flex-basis: 340px;
    flex-grow: 0;
  }

  &__details-column {
    margin-right: 20px;
    max-width: 810px;

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

  &__list-col {
    &:last-of-type {
      margin-right: 112px;
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

  &__alumni-section-columns {
    margin-left: 100px;

    > .columns {
      justify-content: center;
    }
  }

  &__alumni-section {
    border-top: 2px solid $secondary;    
    margin-left: auto;
    margin-right: auto;
    padding-top: 1.375em;

    h3 {
      font-size: 36px;
      margin-bottom: 1.5rem;
    }

    ul {
      > li {
        margin-bottom: 1em;
        font-size: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        ul {
          padding-left: 1em;
          margin-top: .25em;

          > li {
            margin-bottom: .25em;
          }

        }
      }
    }

    h4 {
      font-size: 30px;
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

.indented-list {
  padding-left: 1em;

  li {
    margin-bottom: .25em !important;
  }
}

.station-general-info {
  z-index: 10;
  margin-top: 20px;
  background-color: rgba($primary, .78);
}
</style>

<style lang='scss'>
.station-profile {
  p {
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: $secondary !important;
      text-decoration: underline !important;
    }
  }

  .legends {
    &--minimized {
      bottom: -136px;
    }
  }
}
</style>
