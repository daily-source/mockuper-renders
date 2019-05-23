<template>
  <nav 
    :class='["navbar", {"navbar--opened": opened}]'  
  >
    <div class='navbar-toggle'>
      <button 
        class='navbar-toggle__button'
        @click='toggleNavbar'  
      >
        <div class="navbar-toggle__bar-wrapper">
          <span class='navbar-toggle__bar'></span>
          <span class='navbar-toggle__bar'></span>
          <span class='navbar-toggle__bar'></span>
        </div>
        Menu
      </button>
    </div>
    <div class='navbar-contents'>
      <div class='navbar-contents__actions'>
        <button 
          @click='toggleNavbar'
          class='navbar__button button'
        >
          <icon-close 
            :width='16'
            :height='16'
          />
        </button>
      </div>
      <ul class='navbar-contents__nav'>
        <li class='navbar-contents__nav-item'>
          <router-link to='/nonprofit-sign-up'>Register a Nonprofit</router-link>
        </li>
        <li class='navbar-contents__nav-item'>
          <router-link to='nonprofit-directory'>Nonprofit Directory</router-link>
        </li>
        <li class='navbar-contents__nav-item'>
          <router-link to='/register'>Sign Up</router-link>
        </li>
        <li class='navbar-contents__nav-item'>
          <router-link to='/login'>Login</router-link>
        </li>   
        <li class='navbar-contents__nav-item'>
          <router-link to='#'>Donate</router-link>
        </li>   
        <li class='navbar-contents__nav-item'>
          <router-link to='#'>About Us</router-link>
        </li>   
        <li class='navbar-contents__nav-item'>
          <router-link to='#'>Contact</router-link>
        </li>   
        <li class='navbar-contents__nav-item'>
          <a 
            href='#'
            @click.prevent.stop='onViewIntroClicked'
          >
            View Intro Video
          </a>
        </li>
        <li class='navbar-contents__nav-item'>
          <div class='social-nav'>
            <a href='#'>
              <icon 
                :iconwidth='24'
                :iconheight='24'
                color='#000'
                icon='facebook'
              />
            </a>
            <a href='#'>
              <icon 
                :iconwidth='24'
                :iconheight='24'
                color='#000'
                icon='twitter'
              />
            </a>
            <a href='#'>
              <icon 
                :iconwidth='24'
                :iconheight='24'
                color='#000'
                icon='instagram'
              />
            </a>
          </div>
        </li>
      </ul>
      <div class='navbar__max-good'>
        <p> Virtual Railroad is a project of: </p>
        <router-link to='/'>
          <img
          class='navbar__max-good-logo'
          src="@/assets/img/max-good-logo-428x180.png"
          alt="Maximum for Good Logo"
          >
        </router-link>
      </div>
      <div class='navbar__motto'>
        <p>Helping non-profits and their supporters
        <br /><span class='has-text-weight-bold'>RAISE MONEY. RAISE AWARENESS.
        CHANGE THE WORLD</span></p>
      </div>
      <div class='navbar__copyright'>
        <p>
          Copyright (c) 2006-2019 DailySource. All rights reserved. Terms of Service.
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Icon from 'Components/general/Icons'
import IconClose from 'LocalComponents/Icons/IconClose'

export default {
  name: 'TheNavbar',

  components: {
    IconClose,
    Icon,
  },

  methods: {
    onViewIntroClicked () {
      this.showVideo()
      this.closeNavbar()
    },

    ...mapActions({
      toggleNavbar: 'navbar/toggleNavbar',
      closeNavbar: 'navbar/closeNavbar',
			showVideo: 'video/showVideo',
    }),
  },

  computed: {
    ...mapState({
      opened: state => state.navbar.navbarOpened
    }),
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: transparent;
  min-height: auto;

  &--opened {
    .navbar-contents {
      left: 0;
    }
  }
  
  &__button {
    padding: 0;
    background-color: transparent;
    color: #000;
    height: auto;
    display: flex;
    align-items: center;
    border: 0;
  }

  &__max-good {
    p {
      color: #4e5453;
    }
  }

  &__max-good-logo {
    max-width: 150px;
  }

  &__motto {
    margin-top: 1em;
  }

  &__copyright {
    font-size: .75em;
    margin-top: auto;
  }
}

.navbar-toggle {
  display: flex;
  align-items: center;
  color: inherit;
  font-size: .875rem;
  padding: .25rem .75rem;
  background-color: rgba(78, 84, 83, 0.7);
  border-radius: 100px;
  align-self: flex-start;


  &__button {
    // width: 26px;
    // height: 26px;
    // position: relative;
    text-transform: uppercase;
    letter-spacing: .2em;
    font-size: 0.875rem;
    color: #fff;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
  }

  &__bar-wrapper {
    margin-right: .5em;
    width: 26px;
    height: 26px;
    position: relative;
  }

  &__bar {
    content: '';
    display: block;
    height: 2px;
    width: 16px;
    border-radius: 2px;
    background-color: $secondary;
    position: absolute;
    left: 5px;
    border: 0;

    &:nth-child(1) {
      top: 8px;
    }

    &:nth-child(2) {
      top: 12px;
    }

    &:nth-child(3) {
      top: 16px;
    }
  }
}

.navbar-contents {
  position: fixed;
  top: 0;
  left: -$navbar-width;
  height: 100%;
  width: $navbar-width;
  max-width: 100%;
  background-color: $navbar-background-color;
  padding: 1.5em 1em;
  transition: left .2s ease;
  display: flex;
  flex-direction: column;

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__nav {
    display: flex;
    flex-direction: column;
  }

  &__nav-item {
    text-align: left;
    margin-left: -1em;
    margin-right: -1em;
    padding-left: 1em;
    padding-right: 1em;
    border-bottom: 1px solid $navbar-border-color;
    color: $navbar-color;

    &:first-child {
      border-top: 1px solid $navbar-border-color;
      margin-top: 1em;
    }

    &:last-child {
      border-bottom: transparent;
    }

    a {
      display: block;
      padding-top: 1em;
      padding-bottom: 1em;
      text-transform: uppercase;
      letter-spacing: .2em;
    }
  }
}

.social-nav {
  display: flex;
  justify-content: center;

  a {
    padding-left: .25em;
    padding-right: .25em;
  }
}
</style>
