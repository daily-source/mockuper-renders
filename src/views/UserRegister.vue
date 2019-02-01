<template>
  <div class='user-register'>
    <intro-video />
    <app-header />
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
