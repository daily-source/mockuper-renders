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
    <div class='field'>
      <label for='description' class='label'>Description <span class='has-text-danger'>*</span>:</label>
      <div class='control'>
        <textarea-with-warning
          class='nonprofit-register-form-details__textarea'
          name='description'
          placeholder='Maximum of 500 characters '
          id='description'
          rows='9'
          :max-length='descriptionMaxLength'
          :warning-max-length='475'
          v-model='form.description'
          @invalid='(errors) => onFieldError("description", errors)'
          @warningChange='(warnings) => onFieldWarning("description", warnings)'
        />
        <div class="field-errors">
          <p 
            class='help has-text-success has-text-weight-bold'
            v-if='(errors.description && errors.description.maxLength) || (warnings.description && warnings.description.maxLength)'
          >
            Maximum {{ descriptionMaxLength }} characters. Remaining: 
            <span
              :class='{"has-text-danger": errors.description && errors.description.maxLength}'
            >
              {{ descriptionMaxLength - form.description.length }}
            </span>
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
      warnings: {},
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

    onFieldWarning (field, warnings) {
      this.warnings[field] = warnings
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
.nonprofit-register-form-details {
  .location-chooser-wrapper {
    width: 100%;
    position: relative;
  }

  label {
    font-size: 19px;
    font-weight: 700 !important;
    color: #4a4a4a;
    line-height: 1.4;
    margin-bottom: .75em;
  }

  &__textarea {
    min-height: 168px;
  }
}
</style>
