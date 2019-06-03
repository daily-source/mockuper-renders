<template>
  <div class="nonprofit-register-step-three">
    <div class="container">
      <h3 class='has-text-weight-bold nonprofit-register__heading'>Add A New Nonprofit</h3>
      <nonprofit-register-form />
    </div>
  </div>
</template>

<script>
import NonprofitRegisterForm from 'LocalComponents/Nonprofit/Register/NonprofitRegisterForm'

export default {
  name: 'NonprofitRegisterStepThree',

  components: {
    NonprofitRegisterForm,
  },
}
</script>
