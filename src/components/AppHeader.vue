<template>
  <header 
    :class='["header masthead section is-paddingless", { "header--small": isSmall }]'>
    <div class='container'>
      <div class='header__contents'>
        <div class='header__navbar'>
          <the-navbar />
        </div>
        <div class='header__column header__logo-container'>
          <router-link to='/'>
            <img src='@/assets/img/logo-1.png' alt='Virtual Railroad' class='header__logo'>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

import TheNavbar from 'LocalComponents/TheNavbar'

export default {
  name: 'AppHeader',

  components: {
    TheNavbar,
  },

  props: {
    isSmall: {
      type: Boolean,
      required: false,
      default: true,
    }
  },

	methods: {
		...mapActions({
			showVideo: 'video/showVideo',
		}),
	}
}
</script>

<style lang='scss' scoped>
.header__contents {
  text-align: center;
  padding-top: .5em;
  padding-bottom: .5em;
  position: relative;
}

.social-nav {
  align-items: center;

  &__link {
    font-size: 1.25em;
  }
}

.header__column {
  display: flex;
  justify-content: center;
}

.nav__link {
  padding-left: .5em;
  padding-right: .5em;
}

.header {
  &__logo-container {
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
  }

  &__navbar {
    position: absolute;
    top: 35%;
    left: 0;
  }
}

.header--small {
  .header {
    &__logo-container {
      max-width: 150px;
    }
  }
}
</style>

