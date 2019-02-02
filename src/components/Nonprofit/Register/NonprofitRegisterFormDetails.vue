<template>
  <div class='nonprofit-register-form-details'>
    <div class='field'>
      <label for='name' class='label'>Name <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <input class='input' type='text' name='name' id='name' v-model='form.name'>
      </div>
    </div>
    <div class='field'>
      <label for='description' class='label'>Description <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <input class='input' type='text' name='description' id='description' v-model='form.description'>
      </div>
    </div>
    <div class='field'>
      <label for='link' class='label'>Website Link <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <input class='input' type='text' name='link' id='link' v-model='form.link'>
      </div>
    </div>
    <div class='field'>
      <div class='location-chooser-wrapper'>
        <location-chooser
          ref='locationChooser'
          @placeChanged='onPlaceChanged'
        />
      </div>
    </div>
    <div class='field is-grouped'>
      <div class='control'>
        <button 
          @click.prevent.stop='onAddOfficeLocationClicked' 
          class='button is-primary'
          :disabled='!selectedLocation || !selectedPlace'
        >
          Add Office Location
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LocationChooser from 'LocalComponents/LocationChooser'

export default {
  name: 'NonprofitRegisterFormdetails',

  components: {
    LocationChooser,
  },

  props: {
    /**
     * Default form values
     */
    formValues: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },

  data () {
    return {
      form: {
        ...this.formValues,
      },
      selectedLocation: null,
      selectedPlace: null,
    }
  },

  methods: {
    /**
     * Handles `Add Office Location` clicked
     */
    onAddOfficeLocationClicked () {
      const { selectedLocation, selectedPlace } = this
      this.$emit('addOfficeLocationClicked', selectedPlace, selectedLocation)

      this.$refs.locationChooser.selectedLocation = null
      this.$refs.locationChooser.selectedPlace = null

      this.selectedLocation = null
      this.selectedPlace = null
    },

    onPlaceChanged (place, location) {
      this.selectedPlace = place
      this.selectedLocation = {
        latitude: location.lat(),
        longitude: location.lng(), 
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.location-chooser-wrapper {
  width: 100%;
  position: relative;
}
</style>
