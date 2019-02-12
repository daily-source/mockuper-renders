<template>
  <header 
    :class='["header masthead section is-paddingless", { "header--small": isSmall }]'>
    <div class='container'>
      <div class='header__contents is-flex columns'>
        <div class='header__column header__logo-container column'>
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
    max-width: 250px;
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

