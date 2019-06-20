<template>
  <header 
    :class='headerClasses'
    >
    <div class='container'>
      <div class='header__contents'>
        <div class='header__navbar'>
          <the-navbar />
          <div 
            class="header__left-inner-contents"
            v-if='showExtraContents'  
          >
            <router-link to='#'>Volunteer</router-link>
            <div class="user-space__search">
              <div class="user-space__search-wrapper">
                <div class="user-space__search-trigger" @click="showSearchBar = !showSearchBar">
                  <Icons iconwidth="24px" iconheight="24px" icon="search" color="#999999" class=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='header__column header__logo-container'>
          <router-link to='/'>
            <img :src='logoSrc' alt='Virtual Railroad' class='header__logo'>
          </router-link>
        </div>
        <div 
          class="header__column header__inner-contents"
          v-if='showExtraContents'  
        >
          <div class="header__login-register-links">
            <router-link to='#'>
              Login
            </router-link>
            |
            <router-link to='#'>
              Register
            </router-link>
          </div>
          <div class="max-good" @click="toggleOtherMaxGoodSites()" :class="{ 'active': showingMaxGoodSites }">
            <span class="small">Powered by </span>
            <div class="max-good__submenu-wrapper">
              <img :src="require('Public/max-good-logo-150x18.png')" width="150" height="18" alt="">
              <ul class="other-max-good-sites">
                <li>
                  <span class="other-sites-arrow" :class="{ 'turn': showingMaxGoodSites }">
                    <Icons iconwidth="24px" iconheight="24px" icon="chevron-down" color="#999999" />
                  </span>
                  <ul class="sub" :class="{ 'active': showingMaxGoodSites }">
                    <li v-for="site in maxGoodSites"><a :href="site.href" target="_blank">{{ site.name }}</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import Icons from 'Components/general/Icons'

import TheNavbar from 'LocalComponents/TheNavbar'

export default {
  name: 'AppHeader',

  components: {
    TheNavbar,
    Icons,
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

  data () {
    return {
      showingMaxGoodSites: false,
      maxGoodSites: [
        { name: "Volunteerathon", href: "#" },
        { name: "Quitathon", href: "#" },
        { name: "Loseathon", href: "#" },
        { name: "Give it up for Good", href: "#" },
        { name: "Vacation for Good", href: "#" },
        { name: "Waterathon", href: "#" },
        { name: "Christmas for Good", href: "#" },
        { name: "MLK Day for Good", href: "#" },
        { name: "The Lent Site", href: "#" },
        { name: "Valentines for Good", href: "#" },
        { name: "Fools for Good", href: "#" },
        { name: "Resolutions for Good", href: "#" },
        { name: "Run for good", href: "#" },
        { name: "Bike for Good", href: "#" },
        { name: "Walk for Good", href: "#" },
        { name: "Birthdays for Good", href: "#" },
        { name: "Polar Plunge for Good", href: "#" },
        { name: "Bake for Good", href: "#" }
      ]
    }
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

  > .container {
    position: relative;
    width: 100%;

    @include desktop {
      width: 100%;
    }
  }

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
    display: none;

    @include desktop {
      align-items: center;
      justify-content: flex-end !important;
      flex-basis: calc(50% - 115px);
    }
  }
}

.header__contents {
  text-align: center;
  padding-top: .25em;
  padding-bottom: .25em;
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
    position: absolute;
    top: .5em;
    max-width: 210px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 576px) {
      max-width: 300px;
    }
  }

  &__navbar {
    position: absolute;
    top: 30px;
    left: 0;

    @media (min-width: 576px) {
      top: 40px;
    }
  }
}

.header--small {
  display: flex;
  align-items: center;
  border-bottom: 2px solid $secondary;
  height: 90px;
  // margin-bottom: 2em;

  @media (min-width: 576px) {
    height: 116px;
  }

  > .container {
    position: static;
  }

  .header {
    &__logo-container {
      max-width: 200px;
      position: static;
      margin-left: auto;
      margin-right: auto;
      top: -14px;

      @media (min-width: 576px) {
        max-width: 270px;
      }
    }

    &__navbar {
      position: absolute;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      top: 30px;

      @media (min-width: 576px) {
        top: 40px;
      }

      @include desktop {
        position: static;
        flex-grow: 1;
        flex-basis: calc(50% - 135px);
      }
    }

    &__column {
      flex-grow: 1;
      flex-shrink: 1;
    }

    &__inner-contents {
      display: none !important;

      @include desktop {
        display: flex !important;
      }
    }

    &__left-inner-contents {
      display: none;

      @include desktop {
        display: flex;
        align-items: center;
        margin-left: 20px;
      }

      @include widescreen {
        margin-left: 102px;
      }
    }

    &__login-register-links {
      margin-right: 0;
      margin-top: 4px;

      @include widescreen {
        margin-right: 1em;
      }
    }
  }

  .user-space__search {
    margin-left: 20px;
    margin-top: .25em;

    @include widescreen {
      margin-left: 102px;
    }
  }
}

.max-good {
  margin-left: 20px;
  width: 150px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px 0;
  width: 100%;
  max-height: 50px;
  overflow: hidden;
  z-index: 30;

  &.active {
    max-height: auto;
    overflow: visible;    
  }

  @include tablet {
    width: auto;
  }

  @include widescreen {
    margin-left: 76px;    
  }

  .small {
    padding-right: 10px;
    font-size: 13px;
    align-self: flex-end;
  }

  &__submenu-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  @include desktop {
    flex-direction: column;
    &:hover {
      max-height: auto;
      overflow: visible;

      .other-sites-arrow {
        color: $color-light-gray;
        svg {
          transition: transform 0.2s ease-in-out;
          transform: rotate(180deg);
        }
      }

      ul.sub {
        opacity: 1;
        z-index: 24;

        &.active {
          opacity: 1;
          z-index: 24;
        }
      }
    }
  }
}

.other-max-good-sites {
  padding-left: 10px;
  margin-top: -5px;

  li {
    position: relative;

    .other-sites-arrow {
      font-size: 36px;
      line-height: 18px;
      color: $color-medium-gray;
      svg {
        transition: transform 0.2s ease-in-out;
        transform: rotate(0deg);
      }

      &.turn {
        svg {
          @include mobile {
            transition: transform 0.2s ease-in-out;
            transform: rotate(180deg);
          }
        }
      }
    }

    ul.sub {
      opacity: 0;
      z-index: -1;
      transition: opacity 0.2s ease-in-out;
      position: absolute;
      top: 35px;
      right: 0;
      margin-top: -10px;
      background: rgba($white, 0.9);
      text-align: right;
      border: 1px solid $color-light-gray;

      @include widescreen {
        top: 30px;
      }

      &.active {
        opacity: 1;
        z-index: 24;

        @include widescreen {
          opacity: 0;
          z-index: -1;
        }
      }

      li {
        border-bottom: 1px solid $color-light-gray;
        min-width: 65vw;
        transition: background-color 0.2s ease-in-out;

        @include desktop {
          min-width: 40vw;
        }

        @include widescreen {
          min-width: 300px;
        }

        a {
          display: block;
          padding: 10px 30px;
          transform: translateX(20px);
        }

        &:hover {
          background: rgba($color-light-gray, 0.8);
        }
      }
    }
  }
}
</style>
