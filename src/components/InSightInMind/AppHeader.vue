<template>
    <header class="masthead site-header">
      <div class="container">
        <div class="header__contents is-flex">
          <div class="header__logo has-text-right">
            <router-link to='/'>
              <img src='@/assets/img/in-sight-in-mind-logo.png' class='site-logo' alt="In Sight In Mind Logo">
            </router-link>
            <p class="header__logo-motto">Each time a photo shows, someone is dying of that cause.</p>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang='scss'>
  .header__contents {
    padding-top: 1em;
    padding-bottom: 1em;
    justify-content: center;
    color: $color-dark-gray;

    .header__logo {
      width: 100%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      display: block;

      &-motto {
        margin-top: -1em;
        margin-bottom: 0;
        font-size: .875em;
      }
    }

  }

</style>
