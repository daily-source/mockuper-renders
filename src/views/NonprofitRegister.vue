<template>
  <div class='nonprofit-register'>
    <app-header />
    <intro-video />
    <section class='section'>
      <div class='container'>
        <h2 class='has-text-weight-bold'>Add your nonprofit</h2>
        <p>Please take a moment to sign up to be a nonprofit on the Virtual Railroad.</p>
        <nonprofit-register-form />
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import NonprofitRegisterForm from 'LocalComponents/Nonprofit/Register/NonprofitRegisterForm'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitRegister',

  components: {
    AppHeader,
    IntroVideo,
    SharedFooter,
    NonprofitRegisterForm,
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `Register a Nonprofit | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>
