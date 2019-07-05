<template>
  <form 
    @submit.prevent="processForm"
    class='station-register-step-three-form'
  >
    <stations-directory-list-item 
      :station='form'
      :edit='true'
      @item:change='onItemChange'
    />
    <p>This was the last step. If you’re ready to submit your station for approval, click “Submit.” If you’re not ready, click “Save.” If you want to edit steps 1 or 2, click the links for those at the top of the page.</p>
    <div class="station-register-step-three-form__actions">
      <button class='button is-primary' type='submit'>Submit</button>
      <button class='button is-secondary' @click.prevent='saveStation'>Save</button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import StationsDirectoryListItem from 'LocalComponents/StationsDirectory/StationsDirectoryListItem'

export default {
  name: 'StationRegisterStepThreeForm',

  props: {
    station: {
      type: Object,
      required: true,
    }
  },

  data () {
    return {
      form: {
        ...this.station,
      }
    }
  },

  methods: {
    onItemChange (station) {
      this.form = station
    },

    saveStation () {
      this.setStationForRegistration(this.form)
      this.$emit('station:saved', this.form)
    },

    async processForm() {
      this.setStationForRegistration(this.form)
      const station = await this.registerStation()

      this.$router.push({name: 'stations-profile', params: {id: station.id }, query: {new: 1}})
    },

    ...mapActions({
      registerStation: 'stations/registerStation',
    }),

   ...mapMutations({
      setStationForRegistration: 'stations/setStationForRegistration'
    })
  },

  components: {
    StationsDirectoryListItem,
  },
}
</script>

<style lang='scss' scoped>
.station-register-step-three-form {
  &__actions {
    .button {
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
}
</style>
