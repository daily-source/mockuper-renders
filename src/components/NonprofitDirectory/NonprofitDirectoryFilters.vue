<template>
<div class="nonprofit-directory-filters">
  <button 
    class='button is-primary'
    @click='setSort'
  >
    Sort list by {{ sortBy !== 'name' ? 'nonprofit names' : 'country' }}
  </button>
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

</style>
