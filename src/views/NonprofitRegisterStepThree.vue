<template>
  <div class="nonprofit-register-step-three">
    <div class="nonprofit-register-step-three__container container">
      <h3 class='has-text-weight-bold nonprofit-register__heading'>Submit a New Nonprofit</h3>
      <p class='nonprofit-register__subheading'>If you don’t work for a nonprofit and want to suggest we add one, please contact us here with the nonprofit’s name and website and we will check it out. If you work for a nonprofit, use steps page below to add it.</p>
      <nonprofit-register-irs-form />
    </div>
  </div>
</template>

<script>
import NonprofitRegisterIrsForm from 'LocalComponents/Nonprofit/Register/NonprofitRegisterIRSForm'

export default {
  name: 'NonprofitRegisterStepThree',

  components: {
    NonprofitRegisterIrsForm,
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-register-step-three {
  min-height: 560px;
  
  &__container {
    max-width: 940px;
  }
}
</style>
