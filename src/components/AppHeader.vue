<template>
  <header 
    :class='headerClasses'
    >
    <div class='container'>
      <div class='header__contents'>
        <div class='header__navbar'>
          <the-navbar />
        </div>
        <div class='header__column header__logo-container'>
          <router-link to='/'>
            <img :src='logoSrc' alt='Virtual Railroad' class='header__logo'>
          </router-link>
        </div>
        <div 
          class="header__column header__inner-contents"
          v-if='this.showExtraContents'
        >
          <button 
            class='is-paddingless button header__button'
            @click='showVideo'
          >
            View Intro
          </button>
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
    /**
     * Specifies whether to add a small modifier to the header
     */
    isSmall: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * Specifies whether to show the extra navigation contents on the header
     */
    showExtraContents: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * Specifies the color theme of the header
     */
    theme: {
      type: String,
      requried: false,
      validator (value) {
        const themes = [
          'light',
          'dark',
        ]

        return themes.indexOf(value) !== -1
      },
      default: 'light',
    }, 
  },

	methods: {
		...mapActions({
			showVideo: 'video/showVideo',
		}),
  },
  
  computed: {
    /**
     * The classes to be applied to the header     * 
     */
    headerClasses () {
      return [
        "header masthead section is-paddingless", 
        { "header--small": this.isSmall },
        `header--${this.theme}`,
      ]
    },

    /**
     * The logo to use depending on the theme
     */
    logoSrc () {
      let logoName  = 'logo.png'

      if (this.theme === 'dark') {
        logoName = 'logo-1.png'
      }

      return require(`@/assets/img/${logoName}`)
    },
  },
}
</script>

<style lang='scss' scoped>
.header {
  $self: &;

  &--light {
    #{ $self }__navbar {
      color: #000;
    }

    #{ $self }__button {
      color: $primary;
    }
  }

  &--dark {
    #{ $self }__navbar {
      color: #fff;
    }

    #{ $self }__button {
      color: #fff;
    }
  }

  &__button {
    background-color: transparent;
    border-color: transparent;
    outline-style: none !important;
    box-shadow: none !important;
  }

  &__inner-contents {
    justify-content: flex-end !important;
  }
}

.header__contents {
  text-align: center;
  padding-top: .5em;
  padding-bottom: .5em;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  &__navbar {
    position: absolute;
    top: 25%;
    left: 0;
  }
}

.header--small {
  .header {
    &__logo {
      max-width: 230px;
    }

    &__navbar {
      position: static;
      flex-grow: 1;
      flex-shrink: 1;
    }

    &__column {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
}
</style>
