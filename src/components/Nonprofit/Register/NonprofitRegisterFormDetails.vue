<template>
  <div class='nonprofit-register-form-details'>
    <div class='field'>
      <label for='name' class='label'>Name <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <input-field-with-warning 
          type='text' 
          name='name' 
          id='name' 
          v-model='form.name' 
          :max-length='nonprofitNameMaxLength'
          @invalid='(errors) => onFieldError("name", errors)'
        />
        <div class="field-errors">
          <p 
            class='help has-text-danger has-text-weight-bold'
            v-if='errors.name && errors.name.maxLength'
          >
            * Name cannot exceed {{ nonprofitNameMaxLength }} characters. Name currently exceeds {{ form.name.length - nonprofitNameMaxLength }} character(s).
          </p>
        </div>
      </div>
    </div>
    <div class='field'>
      <label for='description' class='label'>Description <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <textarea-with-warning
          class='nonprofit-register-form__textarea'
          name='description'
          :max-length='descriptionMaxLength'
          id='description' 
          v-model='form.description'
          @invalid='(errors) => onFieldError("description", errors)'
        />
        <div class="field-errors">
          <p 
            class='help has-text-danger has-text-weight-bold'
            v-if='errors.description && errors.description.maxLength'
          >
            * Description cannot exceed {{ descriptionMaxLength }} characters. Description currently exceeds {{ form.description.length - descriptionMaxLength }} character(s).
          </p>
        </div>
      </div>
    </div>
    <div class='field'>
      <label for='link' class='label'>Website Link <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <!-- <input class='input' type='text' name='link' id='link' v-model='form.url'> -->
        <input-field-with-warning 
          type='text' 
          name='link' 
          id='link' 
          v-model='form.url' 
          :max-length='50'
          @invalid='(errors) => onFieldError("url", errors)'
        />
        <div class="field-errors">
          <p 
            class='help has-text-danger has-text-weight-bold'
            v-if='errors.url && errors.url.maxLength'
          >
            * URL cannot exceed {{ 50 }} characters. Name currently exceeds {{ form.name.length - 50 }} character(s).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'
import TextareaWithWarning from 'Components/input/TextareaWithWarning'

export default {
  name: 'NonprofitRegisterFormDetails',

  components: {
    InputFieldWithWarning,
    TextareaWithWarning,
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
    const { name, description, url, locations } = this.formValues
    return {
      form: {
        name,
        description,
        url,
        locations,
      },
      descriptionMaxLength: 500,
      nonprofitNameMaxLength: 50,
      errors: {},
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

    onFormValuesChanged () {
      this.$emit('detailsChanged', this.form)
    },

    onPlaceChanged (place, location) {
      this.selectedPlace = place
      this.selectedLocation = {
        latitude: location.lat(),
        longitude: location.lng(), 
      }
    },

    onFieldError (field, errors) {
      this.errors[field] = errors
    }
  },

  watch: {
    form: {
      deep: true,
      handler: 'onFormValuesChanged'
    }
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-register-form {
  .location-chooser-wrapper {
    width: 100%;
    position: relative;
  }


  &__textarea {
    min-height: 145px;
  }
}
</style>
