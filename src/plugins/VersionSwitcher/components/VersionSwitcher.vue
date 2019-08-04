<template>
  <div class="version-switcher">
    <button 
      :class='["button is-primary version-switcher__trigger", {"version-switcher__trigger--toggled": showContent}]'
      @click='toggleContent'
    >
      <icon 
        :iconheight='24'
        :iconwidth='24'
        :color='iconColor'
        icon='gear'
      />
    </button>
    <transition name='simple-fade'>
      <div 
        :class="['version-switcher__content', {'version-switcher__content--visible': showContent}]"
        v-show='showContent'
      >
        <div 
          class="version-switcher__content-item" 
          v-for='n in versions' 
          :key='n'
        >
          <a :href='`${$route.path}?version=${n}`'>Version {{ n }}</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Icon from 'Components/general/Icons'

export default {
  name: 'VersionSwitcher',
  
  components: {
    Icon,
  },

  props: {
    /**
     * The icon color
     */
    iconColor: {
      type: String,
      required: false,
      default: '#fff',
    },

    /**
     * How many versions does the site have
     */
    versions: {
      type: Number,
      required: false,
      default: 1,
    },
  },

  data () {
    return {
      showContent: false,
    }
  },

  methods: {
    /**
     * Hides/shows the content
     */
    toggleContent () {
      this.showContent = !this.showContent
    },

    ...mapActions({
      switchVersion: 'versionSwitcher/setSiteVersion'
    })
  },

  computed: {
    queryVersion () {
      return this.$route.query.version
    },
  },

  watch: {
    queryVersion (version) {
      this.switchVersion(version)
    },
  },
}
</script>

<style lang='scss' scoped>
.version-switcher {
  $self: &;
  position: fixed;
  bottom: 2%;
  left: 2%;
  z-index: 10;

  &__trigger {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    line-height: 0;
    transition: all .2s ease-in-out;
  }

  &__content {
    position: absolute;
    left: 100%;
    bottom: 10%;
    z-index: 1;
    width: 130px;
    background-color: #333;
    padding: .75em 1em;
    transition: opacity .2s ease;
  }

  &__content-item {
    &:not(:last-child) {
      margin-bottom: .5em;
    }
  }
}
</style>

<style lang='scss'>
.version-switcher {
  $self: &;

  &__trigger {
    svg {
      transition: all .2s ease;
    }

    &--toggled {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
