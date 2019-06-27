<template>
  <div class="nonprofit-register-mailing-form-fields">
    <p class='has-text-weight-bold is-marginless'>Your mailing address for receiving checks from us:</p>
    <div class="nonprofit-register-mailing-form-fields__field field is-horizontal">
      <div class="nonprofit-register-mailing-form-fields__field-label field-label">
        <label class='label has-text-weight-bold' for="mailing-address-1">Mailing address:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              v-model='form.mailingAddr1'
              class='nonprofit-register-mailing-form-fields__input'
              id='mailing-address-1'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-mailing-form-fields__field field is-horizontal">
      <div class="nonprofit-register-mailing-form-fields__field-label field-label">
        <label class='label has-text-weight-bold' for="mailing-address-2">Mailing address 2:<span class='has-text-danger'>*</span></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input-field-with-warning 
              v-model='form.mailingAddr2'
              class='nonprofit-register-mailing-form-fields__input'
              id='mailing-address-2'
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nonprofit-register-mailing-form-fields__field field is-horizontal nonprofit-register-mailing-form-fields__address">
      <div class="field-body">
        <div class="nonprofit-register-mailing-form-fields nonprofit-register-mailing-form-fields__field--city field is-horizontal">
          <div class="nonprofit-register-mailing-form-fields__field-label nonprofit-register-mailing-form-fields__field-label--small field-label">
            <label class='label has-text-weight-bold' for="city">City:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="control">
              <input-field-with-warning 
                v-model='form.city'
                class='nonprofit-register-mailing-form-fields__input'
                id='city'
              />
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="nonprofit-register-mailing-form-fields__field-label nonprofit-register-mailing-form-fields__field-label--small field-label">
            <label class='label has-text-weight-bold' for="state">State:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="control">
              <input-field-with-warning 
                v-model='form.state'
                class='nonprofit-register-mailing-form-fields__input'
                id='state'
              />
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="nonprofit-register-mailing-form-fields__field-label nonprofit-register-mailing-form-fields__field-label--small field-label">
            <label class='label has-text-weight-bold' for="zip">Zip:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="control">
              <input-field-with-warning 
                v-model='form.zip'
                class='nonprofit-register-mailing-form-fields__input'
                id='zip'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>Note: checks will be made out to your legal name.</p>
  </div>
</template>

<script>
import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'

export default {
  name: 'NonprofitRegisterMailingFormFields',

  components: {
    InputFieldWithWarning,
  },

  data () {
    return {
      form: {}
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-register-mailing-form-fields {
  label {
    font-weight: 700 !important;
  }

  &__field {
    &:first-of-type {
      margin-top: 1.5em;
    }

    &:last-of-type {
      margin-bottom: 1em;
    }
  }

  &__address {
    max-width: 685px;
  }


  &__input {
    max-width: 500px;
  }

  &__field-label {
    text-align: left;
    margin-right: .5em;

    &:not(&--small) {
      flex-basis: 100px;
      max-width: 160px;
      margin-right: 1.5em;
    }
  } 

  &__small-text {
    font-size: 0.875em;
  }

  &__field {
    &--city {
      flex-shrink: 0;
      flex-basis: 250px;
      max-width: 250px;
    }
  }
}
</style>
