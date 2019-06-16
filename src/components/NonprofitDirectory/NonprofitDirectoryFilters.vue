<template>
<div class="nonprofit-directory-filters">
  <div class="nonprofit-directory-filters__sort is-flex">
    Sort list by: 
    <div :class="['dropdown', {'is-active': dropdownShow}]">
      <div class="dropdown-trigger">
        <button 
          class="button nonprofit-directory-filters__button" 
          aria-haspopup="true" 
          aria-controls="dropdown-menu"
          @click='dropdownShow = !dropdownShow'
        >
          <span>{{ sortBy === 'name' ? 'Nonprofit names' : 'Country'}}</span>
          <span class="icon is-small">
            <icon 
              :iconwidth='24'
              :iconheight='24'
              icon='chevron-down'
            />
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a
            href='#'
            :class="['dropdown-item', { 'is-active': sortBy === 'name' }]"
            @click.stop.prevent='setSort("name")'
          >
            Nonprofit names
          </a>
          <a 
            href='#' 
            :class="['dropdown-item', { 'is-active': sortBy === 'country' }]"
            @click.stop.prevent='setSort("country")'
          >
            Country
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Icon from 'Components/general/Icons'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'NonprofitDirectoryFilters',

  components: {
    Icon,
  },

  data () {
    return {
      dropdownShow: false,
    }
  },

  methods: {
    /**
     * Sets the sort to by country or by name
     */
    setSort (sortBy) {
      if (sortBy === 'name') {
        this.setSortToByName()
      } else {
        this.setSortToByCountry()
      }

      this.dropdownShow = false
    },

    ...mapActions({
      setSortToByName: 'nonprofitDirectory/setSortToByName',
      setSortToByCountry: 'nonprofitDirectory/setSortToByCountry',
    })
  },

  computed: {
    ...mapState({
      sortBy: state => state.nonprofitDirectory.sortBy
    }),
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-directory-filters {
  flex-wrap: wrap;
  &__sort {
    flex-wrap: wrap;
    align-items: center;

    .dropdown {
      @include tablet {
        margin-left: .5em;
      }

      .button {
        min-width: 180px;   
        justify-content: space-between;     
      }

      .icon {
        position: relative;
        top: 4px;
      }
    }
  }
}
</style>

