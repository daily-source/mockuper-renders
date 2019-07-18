<template>
  <div id="app">
    <div id="nav" class="fake-menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/fundraiser/">Fundraiser</router-link> |
      <router-link to="/nonprofit/">Nonprofit</router-link>
    </div>
    <router-view/>
    <version-switcher 
      :versions='2'
    />
  </div>
</template>

<style src='./xthon-core/lib/assets/scss/main.scss' lang="scss"></style>
<style src='./assets/scss/main.scss' lang="scss"></style>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,900|Poppins:400,500,700");
</style>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
</style>

<style lang="scss">
.view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

/**
 * TODO: remove styles below.
 * The styles below are temporary and should be removed once the site is up.
 */
.fake-menu {
  display: none;
  position: fixed;
  opacity: 0;
  bottom: 40px;
  right: 20px;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0,0,0,0.8);
  z-index: 10;
  font-size: 16px;
  line-height: 16px;
  a {
    display: block;
  }

  &:hover {
    opacity: 1;
  }
  @include widescreen {
    display: block;
  }
}</style>
