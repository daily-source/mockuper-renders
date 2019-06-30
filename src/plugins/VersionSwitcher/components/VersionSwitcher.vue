<template>
  <div class="version-switcher">
    <button 
      class='button is-primary version-switcher__trigger'
    >
      <icon 
        :iconheight='24'
        :iconwidth='24'
        :color='iconColor'
        icon='gear'
      />
    </button>
    <div class="version-switcher__content">
      <a v-for='n in versions' :key='n' :href='`/?version=${n}`'>Version {{ n }}</a>
    </div>
  </div>
</template>

<script>
import Icon from 'Components/general/Icons'

export default {
  name: 'VersionSwitcher',

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

  components: {
    Icon,
  },

  data () {
    versions 
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

  &:hover {
    > #{ $self }__content {
      opacity: 1;
      bottom: 10%;
    }

    > #{ $self }__trigger {
      svg {
        transform: rotate(30deg);
      }
    }
  }

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
    bottom: -9999em;
    z-index: 1;
    width: 130px;
    background-color: #333;
    padding: .75em 1em;
    opacity: 0;
    transition: opacity .2s ease;
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
  }

  &:hover {
    > #{ $self }__trigger {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
