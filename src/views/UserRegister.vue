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

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: 'Register | Virtual Railroad - v2',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>
