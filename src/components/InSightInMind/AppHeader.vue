<template>
    <header class="masthead site-header">
      <div class="container">
        <div class="header__contents is-flex">
          <div class="header__logo has-text-right">
            <router-link to='/'>
              <img src='@/assets/img/in-sight-in-mind-logo.png' class='site-logo' alt="In Sight In Mind Logo">
            </router-link>
          </div>
          <p class="header__logo-motto">This site displays how often people are dying of various causes.</p>
          <p class="header__logo-motto">Each time a photo shows, someone is dying of that cause.</p>
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
    flex-direction: column;
    align-items: center;

    .header__logo {
      width: 100%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      display: block;
      margin-bottom: 1.375rem;

      &-motto {
        margin-bottom: 0;
        font-size: 1.033rem;
      }
    }
  }
</style>
