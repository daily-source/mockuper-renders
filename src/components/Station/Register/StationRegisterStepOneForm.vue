<template>
  <form 
    @submit.prevent="onFormSubmit"
    class='station-register-step-one-form'
  >
    <div class="station-register-step-one-form__radios">
      <div class="field is-horizontal">
        <div class="station-register-step-one-form__field-label field-label station-register-step-one-form__field-label--large">
          <p class='is-marginless'>Are you a 501(c)3 nonprofit organization?</p>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input type="radio" name="member" v-model='is501' :value='1'>
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="member" v-model='is501' :value='0'>
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <slide-fade>
      <div class="station-register-step-one-form__nonprofit-search" v-if='is501'>
        <div class="columns">
          <nonprofit-ajax-search
            class='station-register-step-one-form__nonprofit-search-select'
            placeholder='Type to search for a nonprofit'
            @selected='onNonprofitAjaxSelect'
          />
        </div>
        <button type='submit' class='button is-primary' :disabled='!(is501 && this.nonprofit)'>Submit</button>
      </div>
    </slide-fade>

    <slide-fade>
      <div class="station-register-step-one-form__station-fields" v-if='!is501'>
        <p>Please enter the following:</p>

        <div class="station-register-step-one-form__field field is-horizontal">
          <div class="station-register-step-one-form__field-label field-label">
            <label class='label has-text-weight-bold' for="name">Name of group:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  v-model='form.name'
                  class='station-register-step-one-form__input'
                  id='name'
                />
              </div>
            </div>
          </div>
        </div>

        <div class="station-register-step-one-form__field field is-horizontal">
          <div class="station-register-step-one-form__field-label field-label">
            <label class='label has-text-weight-bold' for="email">Email:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  v-model='form.email'
                  type='email'
                  class='station-register-step-one-form__input'
                  id='email'
                />
              </div>
            </div>
          </div>
        </div>

        <div class="station-register-step-one-form__field field is-horizontal">
          <div class="station-register-step-one-form__field-label field-label">
            <label class='label has-text-weight-bold' for="password">Password:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  v-model='form.password'
                  class='station-register-step-one-form__input'
                  type='password'
                  id='password'
                />
              </div>
            </div>
          </div>
        </div>

        <div class="station-register-step-one-form__field field is-horizontal">
          <div class="station-register-step-one-form__field-label field-label">
            <label class='label has-text-weight-bold' for="telephone">Telephone:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  v-model='form.telephone'
                  class='station-register-step-one-form__input'
                  id='telephone'
                />
              </div>
            </div>
          </div>
        </div>

        <div class="station-register-step-one-form__field field is-horizontal">
          <div class="station-register-step-one-form__field-label field-label">
            <p class='label has-text-weight-bold is-marginless'>Contact Person:<span class='has-text-danger'>*</span></p>
          </div>
          <div class="field-body">
            <div class="field station-register-step-one-form__field--name">
              <label for="firstname" class="sr-only">First name</label>
              <div class="control">
                <input-field-with-warning 
                  v-model='form.firstName'
                  class='station-register-step-one-form__input station-register-step-one-form__input--name'
                  id='firstname'
                  placeholder='First name'
                />
              </div>
            </div>
            <div class="field station-register-step-one-form__field--name">
              <label for="lastname" class="sr-only">Last name</label>
              <div class="control">
                <input-field-with-warning 
                  v-model='form.lastName'
                  class='station-register-step-one-form__input station-register-step-one-form__input--name'
                  placeholder='Last name'
                  id='lastname'
                />
              </div>
            </div>
          </div>
        </div>

        <div class="station-register-step-one-form__field field is-horizontal">
          <div class="station-register-step-one-form__field-label field-label">
            <label class='label has-text-weight-bold' for="website">Website:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  v-model='form.website'
                  class='station-register-step-one-form__input'
                  id='website'
                />
              </div>
            </div>
          </div>
        </div>

        <button type='submit' class='button is-primary' :disabled='!isValid'>Continue</button>
      </div>
    </slide-fade>
  </form>
</template>

<script>
import SlideFade from 'Components/transitions/SlideFade'
import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'
import NonprofitAjaxSearch from 'Components/general/NonprofitAjaxSearch'

export default {
  name: 'StationRegisterStepOneForm',

  components: {
    InputFieldWithWarning,
    NonprofitAjaxSearch,
    SlideFade,
  },
  
  data () {
    return {
      is501: 1,
      nonprofit: null,
      form: {},
    }
  },

  methods: {
    /**
     * Handles form submssion
     */
    onFormSubmit () {
      this.$router.push({name: 'stations-register-step-two'})
      console.log('submitted')
    },

    /**
     * Hanels Nonprofit Ajax search changes
     */
    onNonprofitAjaxSelect (nonprofit) {
      this.nonprofit = nonprofit
    }
  },

  computed: {
    isValid () {
        return this.form.name && this.form.firstName && this.form.firstName && this.form.email && this.form.password      
    }
  },
}
</script>

<style lang='scss' scoped>
.station-register-step-one-form {
  &__radios {
    padding-top: 2em;
    padding-bottom: 3.25em;
  }

  &__field-label  {
    // flex-basis: 250px;
    // max-width: 250px;
    text-align: left;

    > .label {
      font-weight: 700 !important;
    }

    &--large {
      flex-basis: 365px;
      max-width: 365px;
    }
  }

  &__field {
    &--name {
      max-width: calc(250px - .375rem);
    }
  }

  &__nonprofit-search {
    padding-bottom: 2em;
  }

  &__input {
    max-width: 500px;
  }

  &__station-fields {
    padding-bottom: 3.25em;
    .button {
      margin-top: 1em;
    }
  }
}
</style>

