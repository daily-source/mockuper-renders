<template>
  <div class='user-register'>
    <intro-video />
    <app-header />
    <section class='intro-text'>
      <div class='container'>
        <p class='has-text-centered'>If you were alive in the 1800s, would you have supported the Underground Railroad to free slaves? Today, there are 25 million slaves in the world, more than ever in history. Will you help to free some of them?</p>
      </div>
    </section>
    <section class='section'>
      <user-register-form />
    </section>
    <shared-footer />
  </div>
</template>

<script>
import IntroVideo from 'LocalComponents/IntroVideo'
import AppHeader from 'LocalComponents/AppHeader'
import UserRegisterForm from 'LocalComponents/User/Register/UserRegisterForm'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'UserRegister',

  components: {
    AppHeader,
    IntroVideo,
    UserRegisterForm,
    SharedFooter,
  },
}
</script>

<style lang='scss'>
.intro-text {
  p {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;    
  }
}
</style>
