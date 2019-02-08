<template>
  <header 
    :class='["header masthead section is-paddingless", { "header--small": isSmall }]'>
    <div class='container'>
      <div class='header__contents is-flex columns'>
        <!-- <div class='header__column header__social-nav-container column'>
          <ul class='social-nav nav is-flex'>
            <li class='social-nav__item nav__item'>
              <a href='#' class='social-nav__link nav__link'>
                <i class='fab fa-facebook-f'></i>
              </a>
            </li>
            <li class='social-nav__item nav__item'>
              <a href='#' class='social-nav__link nav__link'>
                <i class='fab fa-google-plus'></i>
              </a>
            </li>
            <li class='social-nav__item nav__item'>
              <a href='#' class='social-nav__link nav__link'>
                <i class='fab fa-twitter'></i>
              </a>
            </li>
          </ul>
        </div> -->
        <div class='header__column header__logo-container column'>
          <router-link to='/'>
            <img src='@/assets/img/logo.png' alt='Virtual Railroad' class='header__logo'>
          </router-link>
        </div>
        <!-- <div class='header__column header__nav-container column'>
          <nav class='main-nav'>
            <ul class='is-flex nav'>
              <li class='nav-item'>
                <router-link to='/register' class='nav__link'>
                  Sign Up
                </router-link>
              </li>
              <li class='nav-item'>
                <a href='sign-up' class='nav__link'>
                  Login
                </a>
              </li>
              <li class='nav-item'>
                <a @click.stop.prevent='showVideo(true)' href='#' class='nav__link'>
                  View Intro 
                </a>
              </li>
            </ul>
          </nav>
        </div> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppHeader',

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
  align-items: center;
  padding-top: .5em;
  padding-bottom: .5em
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
  &__logo {
    max-width: 300px;
  }
}

.header--small {
  .header {
    &__logo-container {
      max-width: 200px;
    }
  }
}
</style>

