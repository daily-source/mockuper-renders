<template>
  <div class="nonprofit-register-step-four">
    <div class="container">
      <alert
        :open='alertOpened'
        type='success'
        @closeButtonClicked='alertOpened = false'
        class='nonprofit-register-step-four__alert'
      >
        <p class='is-marginless'>
          We’ve sent you an email to verify your email address.
        </p>
      </alert>
      <h3 class='has-text-weight-bold nonprofit-register__heading'>Set up a nonprofit profile page</h3>
      <p class="nonprofit-register__subheading">Now create your profile page. All of the things you add below will show up on your profile page.</p>
      <nonprofit-register-form />
    </div>
  </div>
</template>

<script>
import Alert from 'LocalComponents/Alert/Alert'
import NonprofitRegisterForm from 'LocalComponents/Nonprofit/Register/NonprofitRegisterForm'

export default {
  name: 'NonprofitRegisterStepFour',

  data () {
    return {
      alertOpened: true
    }
  },

  components: {
    Alert,
    NonprofitRegisterForm,
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-register-step-four {
  h3 {
    font-size: 29px;
  }

  .subheading {
    font-size: 1.25em;
    margin-bottom: 1.75em;
  }

  &__alert {
    padding: .75rem 1.25rem;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    // border-radius: 4px;
    // border-radius: 100%;
  }
}
</style>
