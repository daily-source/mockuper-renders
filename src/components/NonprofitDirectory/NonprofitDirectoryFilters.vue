<template>
<div class="nonprofit-directory-filters">
  <button :class='["button is-primary nonprofit-directory-filters__button", { "is-active": sortBy === "country"}]' @click='setSort'>Sort list by country</button>
  <button :class='["button is-primary nonprofit-directory-filters__button", { "is-active": sortBy === "name"}]' @click='setSort'>Sort list by nonprofit names</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NonprofitDirectoryFilters',

  methods: {
    /**
     * Sets the sort to by country or by name
     */
    setSort () {
      if (this.sortBy === 'name') {
        this.setSortToByCountry()
      } else {
        this.setSortToByName()
      }
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
  display: flex;
  &__button {
    height: auto;
    display: flex;
    align-items: center;
    background-color: transparent;
    color: $black;
    border-color: $black;
    transition: all .2s ease;
    padding: .5em;
    line-height: 1;
    font-size: 0.875em;

    &:not(:last-child) {
      margin-right: 1em;
    }
  }
}
</style>

