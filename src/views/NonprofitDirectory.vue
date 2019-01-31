<template>
  <div class='nonprofit-directory'>
    <intro-video />
    <app-header />
    <section class='section'>
      <div class='container'>
        <h3 class='has-text-weight-bold has-text-centered'>Nonprofits helping the virtual railroad</h3>
        <nonprofit-directory-list />
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import NonprofitDirectoryList from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryList'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitDirectory',

  components: {
    AppHeader,
    IntroVideo,
    NonprofitDirectoryList,
    SharedFooter,
  }
}
</script>

