<template>
  <div class="nonprofit-register-non-irs-form-fields">
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label class='label has-text-weight-bold' for="name">Nonprofit's legal name:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              v-model='form.name'
              class='nonprofit-register-non-irs-form-fields__input'
              id='name'
            />
          </div>
        </div>
      </div>
    </div>
    <p class='nonprofit-register-non-irs-form-fields__small-text has-text-grey'>When you create your profile page, you can have a simpler version of the name show there. For example, minus the “Inc” that is in the legal name.</p>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label class='label has-text-weight-bold' for="country">Country where it’s incorporated:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="nonprofit-register-non-irs-form-fields__input is-block select">
              <select 
                name="country"
                id="country"
                class='nonprofit-register-non-irs-form-fields__input is-block'
                v-model='form.country'
              >
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="email">Email:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              class='nonprofit-register-non-irs-form-fields__input'
              id='email'
              type='email'
              v-model='form.email'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="password">Password:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning
              v-model='form.password'
              class='nonprofit-register-non-irs-form-fields__input'
              id='password'
              type='password'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="firstname">First name:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              class='nonprofit-register-non-irs-form-fields__input'
              id='firstname'
              v-model='form.firstname'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="lastname">Last name:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              class='nonprofit-register-non-irs-form-fields__input'
              id='lastname'
              v-model='form.lastname'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="telephone">Telephone:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              class='nonprofit-register-non-irs-form-fields__input'
              id='telephone'
              v-model='form.telephone'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="link">Anti-slavery link:<span class="has-text-danger">*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning
              v-model='form.link'
              class='nonprofit-register-non-irs-form-fields__input'
              id='link'
              placeholder='Link to a page about your work'
              :max-length='10'
              @invalid='(errors) => onFieldError("link", errors)'
              @valid='onFieldValid("link")'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-non-irs-form-fields__field field is-horizontal">
      <div class="nonprofit-register-non-irs-form-fields__field-label field-label">
        <label for="note">Note:<span class="has-text-danger">*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="nonprofit-register-non-irs-form-fields__input">
              <textarea-with-warning 
                id='note'
                class='nonprofit-register-non-irs-form-fields__note'
                rows='13'
                placeholder='Describe your anti-slavery activities. Why should we include you in the Virtual Railroad? 700 characters max.'
                :max-length='700'
                :warningMaxLength='675'
                @invalid='(errors) => onFieldError("note", errors)'
                @valid='onFieldValid("note")'
                @warningChange='(warnings) => onFieldWarning("description", warnings)'
                v-model='form.note'
              />
            </div>
          </div>
          <div class="field-errors">
             <p 
                class='help has-text-success has-text-weight-bold'
                v-if='(errors.note && errors.note.maxLength) || (warnings.note && warnings.note.maxLength)'
              >
                Maximum 700 characters. Remaining: 
                <span
                  :class='{"has-text-danger": errors.note && errors.note.maxLength}'
                >
                  {{ 700 - form.note.length }}
                </span>
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'
import TextareaWithWarning from 'Components/input/TextareaWithWarning'

export default {
  name: 'NonprofitRegisterNonIrsFormFields',

  components: {
    InputFieldWithWarning,
    TextareaWithWarning,
  },

  data () {
    return {
      form: {
        note: '',
      },
      errors: {},
      warnings: {},
      hasError: false,
    }
  },

  methods: {
    /**
     * Handles on field errors
     */
    onFieldError (field, errors) {
      this.errors[field] = errors
    },

    onFieldWarning (field, warnings) {
      this.warnings[field] = warnings
    },

    onFieldValid (field) {
      this.errors[field] = null
    },

    onFormValuesChanged () {
      Object.keys(this.errors).forEach(key => {
        if (this.errors[key]) {
          console.log('something')
          this.hasError = true

          return
        }

        this.hasError = false
      })

      console.log(this.hasError)

      this.$emit('detailsChanged', this.form, this.hasError)
    },
  },

  watch: {
    form: {
      deep: true,
      handler: 'onFormValuesChanged'
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-register-non-irs-form-fields {
  label {
    font-weight: 700 !important;
  }

  &__field {
    &:first-of-type {
      margin-top: 2em;
    }

    &:last-of-type {
      margin-bottom: 1em;
    }
  }

  &__input {
    max-width: 500px;
  }

  &__field-label {
    flex-basis: 155px;
    text-align: left;
  }

  &__small-text {
    font-size: 0.875em;
  }
}
</style>
