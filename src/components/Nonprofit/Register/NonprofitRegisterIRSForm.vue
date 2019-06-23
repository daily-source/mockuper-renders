<template>
<div class="nonprofit-register-irs-form">
  <form @submit.prevent='onFormSubmit'>
    <div class="nonprofit-register-irs-form__radios">
      <div class="field is-horizontal">
        <div class="nonprofit-register-irs-form__field-label field-label">
          <p class='is-marginless'>Is this a U.S. IRS-approved 501(c)3 tax-exempt nonprofit?</p>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input type="radio" name="member" v-model='isApproved' :value='1'>
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="member" v-model='isApproved' :value='0'>
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <slide-fade>
      <div 
        class="nonprofit-register-irs-form__not-irs"
        v-if='isApproved === 0'
      >
        <p>Even if you’re not a tax-exempt 501(c)3, we will consider adding you to the Virtual Railroad if you are a real nonprofit that is fighting slavery. We won’t be able to receive donations for you, but we can link to your website. People can choose to donate directly to you: they just won’t get a tax deduction.</p>
        <nonprofit-register-non-irs-form-fields 
          @detailsChanged='onDetailsChanged'
        />
        <div class="nonprofit-register-irs-form__not-irs-actions">
          <button type='submit' class='button is-primary' :disabled='!isValid'>Submit</button> 
        </div>
      </div>
    </slide-fade>

    <slide-fade>
      <div 
        class="nonprofit-register-irs-form__irs"
        v-if='isApproved === 1'
      >
        <div class="columns">  
          <nonprofit-ajax-search
            class='nonprofit-register-irs-form__irs-nonprofit-search'
            placeholder='Type to search for a nonprofit'
          />
        </div>
        <button type='submit' class='button is-primary'>Submit</button>
      </div>
    </slide-fade>
  </form>
</div>
</template>

<script>
import SlideFade from 'Components/transitions/SlideFade'
import NonprofitAjaxSearch from 'Components/general/NonprofitAjaxSearch'
import NonprofitRegisterNonIrsFormFields from 'LocalComponents/Nonprofit/Register/NonprofitRegisterNonIRSFormFields'

export default {
  name: 'NonprofitRegisterIRSForm',

  components: {
    SlideFade,
    NonprofitRegisterNonIrsFormFields,
    NonprofitAjaxSearch,
  },

  data () {
    return {
      isApproved: 1,
      form: {},
      hasError: false,
    }
  },

  methods: {
    /**
     * Handles the form submission
     */
    onFormSubmit () {
      if (this.isApproved === 0) {
        this.handleNonIRSFormSubmission()
      }
    },

    /**
     * Handles form submission for Non-IRS approved nonprofits
     */
    handleNonIRSFormSubmission () {
      this.$router.push({ name: 'nonprofit-sign-up-step-four', query: {"nonIrs": 1} })
    },

    onDetailsChanged (data, hasError) {
      this.form = data

      if (this.hasError !== hasError) {
        this.hasError = hasError
      }

    },
  },

  computed: {
    isValid () {
      if (this.isApproved === 0) {
        return this.form.name && this.form.email && this.form.firstname && this.form.lastname && this.form.password && this.form.note && this.form.link
      }

      return true
    }
  }
}
</script>

<style lang='scss' scoped>
.nonprofit-register-irs-form {
  &__radios {
    padding-top: 2em;
    padding-bottom: 3.25em;
  }

  &__field-label  {
    flex-basis: 365px;
    text-align: left;
  }

  &__not-irs-actions {
    padding-left: 300px;
  }

  &__not-irs {

  }

  &__irs {
    padding-bottom: 2em;
  }
}
</style>
