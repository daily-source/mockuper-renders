<template>
  <header 
    :class="`masthead site-header site-header--v${$version}`"
  >
    <div class="container">
      <div class="site-header__contents is-flex">
        <div class="site-header__logo">
          <router-link to='/'>
            <img src='@/assets/img/in-sight-in-mind-logo.png' class='site-logo' alt="In Sight In Mind Logo">
          </router-link>
        </div>
        <p class="site-header__motto">This site displays how often people are dying of various causes.</p>
        <p class="site-header__motto">Each time a photo shows, someone is dying of that cause.</p>
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
.site-header {
  $self: &;

  &__contents {
    padding-top: .5em;
    padding-bottom: .5em;
    justify-content: center;
    color: $color-dark-gray;
    flex-direction: column;
    align-items: center;
  }

  &__logo {
    width: 100%;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: .625rem;

    @include tablet {
      max-width: 350px;
    }
  }

  &__motto {
    margin-bottom: 0;
    text-align: center;
    font-size: .875rem;

    @include tablet {
      font-size: 1.033rem;
      text-align: left;
    }
  }
}
</style>
